// src/MapComponent.tsx

import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // Import heatmap support
import { UserInfo } from "../types/userInfo";
import { RootState } from "../store/store";
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

// Group markers by unique lat/lng to calculate density
const calculateHeatPoints = (data: { lat: number; lng: number }[]) => {
  const pointMap = new Map<string, number>();


  // Count the number of occurrences at each location
  data.forEach((city) => {
    const key = `${city.lat},${city.lng}`;
    if (pointMap.has(key)) {
      pointMap.set(key, pointMap.get(key)! + 1);
    } else {
      pointMap.set(key, 1);
    }
  });

  // Convert grouped points to heatmap format
  const heatPoints = Array.from(pointMap.entries()).map(([key, count]) => {
    const [lat, lng] = key.split(",").map(Number);
    return [lat, lng, count]; // lat, lng, and intensity
  });

  return heatPoints;
};

const MapComponent: React.FC<{ bloodGroupPeople: UserInfo[] }> = ({
  bloodGroupPeople,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const user = useSelector((state: any) => state.authStore.userInfo);

  console.log("User from Redux:", user);
  console.log("Blood Group People:", bloodGroupPeople);

  // Clear and reinitialize map when component unmounts
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Setup map instance
  useEffect(() => {
    // Add debugging logs
    console.log("MapComponent useEffect triggered");
    console.log("Blood Group People count:", bloodGroupPeople?.length || 0);
    console.log("mapRef.current exists:", !!mapRef.current);
    console.log("mapInstanceRef.current exists:", !!mapInstanceRef.current);
    
    // Check if user object is valid
    if (!user || !user.location || typeof user.location.lat !== 'number' || typeof user.location.long !== 'number') {
      console.error("User location data is invalid:", user);
      return;
    }

    // Clean up previous map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize the map
    if (mapRef.current && !mapInstanceRef.current) {
      console.log("Creating new map instance");
      
      try {
        const map = L.map(mapRef.current).setView(
          [user.location.lat, user.location.long], // Center on user location
          15 // Zoom level
        );
        
        mapInstanceRef.current = map;

        // Add marker for the current user
        L.marker([user.location.lat, user.location.long])
          .addTo(map)
          .bindPopup("<b>You are here</b><br>Blood Bank")
          .openPopup();

        // Add OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        setMapLoaded(true);
      } catch (error) {
        console.error("Error creating map:", error);
      }
    }
  }, [user]);

  // Add markers for people when map is loaded and bloodGroupPeople changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) {
      return;
    }
    
    const map = mapInstanceRef.current;
    
    // Add markers for each person in bloodGroupPeople
    if (Array.isArray(bloodGroupPeople) && bloodGroupPeople.length > 0) {
      console.log("Adding markers for bloodGroupPeople");
      
      bloodGroupPeople.forEach((person, index) => {
        console.log(`Processing person ${index}:`, person);
        
        // Check if person has valid location data
        if (person && person.location && 
            typeof person.location.lat === 'number' && 
            typeof person.location.long === 'number') {
          
          console.log(`Adding marker at ${person.location.lat}, ${person.location.long}`);
          
          try {
            const marker = L.marker([person.location.lat, person.location.long])
              .addTo(map);
            
            // Create popup content with person details
            const popupContent = `
              <b>${person.username || 'Unknown User'}</b><br>
              Blood Group: ${person.bloodGroup || 'Unknown'}<br>
              Phone: ${person.phoneNumber || 'N/A'}<br>
              ${person.donorOrganization ? 'Donor Organization' : 'Individual'}
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
      console.warn("bloodGroupPeople is empty or not an array:", bloodGroupPeople);
    }
  }, [bloodGroupPeople, mapLoaded]);

  return <div id="map" ref={mapRef} style={mapStyle}></div>;
};

export default MapComponent;
