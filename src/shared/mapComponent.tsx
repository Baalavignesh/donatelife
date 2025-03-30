// src/MapComponent.tsx

import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // Import heatmap support
import { UserInfo } from "../types/userInfo";
import { useSelector } from "react-redux";

// Fix Leaflet marker icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Define map container styles
const mapStyle = {
  height: "600px",
  width: "100%",
};

// Fix default icon issue in Leaflet
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


const MapComponent: React.FC<{ bloodGroupPeople: UserInfo[], radius: number }> = ({
  bloodGroupPeople, radius
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const user = useSelector((state: any) => state.authStore.userInfo);


  // Clear and reinitialize map when component unmounts
  useEffect(() => {
    return () => {
      clearAllMarkers();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Clear all markers helper function
  const clearAllMarkers = () => {
    if (markersRef.current.length > 0) {
      console.log(`Clearing ${markersRef.current.length} markers`);
      markersRef.current.forEach(marker => {
        if (marker) marker.remove();
      });
      markersRef.current = [];
    }
  };

  // Initialize the map just once
  useEffect(() => {
    // Check if user object is valid
    if (!user || !user.location || typeof user.location.lat !== 'number' || typeof user.location.long !== 'number') {
      console.error("User location data is invalid:", user);
      return;
    }

    // Only create the map if it doesn't exist
    if (mapRef.current && !mapInstanceRef.current) {
      console.log("Creating new map instance");
      
      try {
        const map = L.map(mapRef.current).setView(
          [user.location.lat, user.location.long], // Center on user location
          12 // Zoom level
        );
        
        mapInstanceRef.current = map;

        // Add OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add marker for the current user
        L.marker([user.location.lat, user.location.long], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        })
          .addTo(map)
          .bindPopup("Blood Bank")
          .openPopup();

        setMapLoaded(true);
      } catch (error) {
        console.error("Error creating map:", error);
      }
    }
  }, [user]);

  // Update circle when radius changes
  useEffect(() => {
    if (!mapInstanceRef.current || !user) return;
    
    
    // Remove old circle
    if (circleRef.current) {
      circleRef.current.remove();
    }
    
    // Create new circle with updated radius
    circleRef.current = L.circle([user.location.lat, user.location.long], {
      radius: radius,
      color: radius > 5000 ? 'red' : 'blue',
      fillColor: radius > 5000 ? 'red' : 'blue',
      fillOpacity: 0.2
    }).addTo(mapInstanceRef.current);
    
  }, [radius, user]);

  // Add markers for people when map is loaded and bloodGroupPeople changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) {
      console.log("Map not loaded yet, skipping marker update");
      return;
    }
    
    const map = mapInstanceRef.current;
    
    // Clear all existing markers first
    clearAllMarkers();
    
    // Add markers for each person in bloodGroupPeople
    if (Array.isArray(bloodGroupPeople) && bloodGroupPeople.length > 0) {
      
      bloodGroupPeople.forEach((person, index) => {
        // Check if person has valid location data
        if (person && person.location && 
            typeof person.location.coordinates?.[1] === 'number' && 
            typeof person.location.coordinates?.[0] === 'number') {
          
          try {
            const marker = L.marker([person.location.coordinates[1], person.location.coordinates[0]])
              .addTo(map);
            
            // Store reference to marker for later removal
            markersRef.current.push(marker);
            
            // Create popup content with person details
            const popupContent = `
              <b>${person.username || 'Unknown User'}</b><br>
              Blood Group: ${person.bloodGroup || 'Unknown'}<br>
              Phone: ${person.phoneNumber || 'N/A'}<br>
            `;
            
            marker.bindPopup(popupContent);
          } catch (err) {
            console.error(`Error adding marker for person ${index}:`, err);
          }
        } else {
          console.error(`Person ${index} has invalid location:`, person);
        }
      });
    } else {
      console.warn("bloodGroupPeople is empty or not an array");
    }
  }, [bloodGroupPeople, mapLoaded]);

  return <div id="map" ref={mapRef} style={mapStyle}></div>;
};

export default MapComponent;
