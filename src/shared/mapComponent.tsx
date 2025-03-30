// src/MapComponent.tsx

import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // Import heatmap support
import locationData from "./locationData"; // Import location data

// Define map container styles
const mapStyle = {
    height: "600px",
    width: "100%",
};

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

const MapComponent: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the map only if not already created
        if (mapRef.current && !mapRef.current._leaflet_id) {
            const map = L.map(mapRef.current).setView(
                [37.5407, -77.436], // Center on Richmond
                7 // Zoom level
            );

            // Add OpenStreetMap tile layer
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // ✅ Prepare heatmap data with density of markers
            const heatPoints = calculateHeatPoints(locationData);

            // ✅ Add heatmap layer to the map
            L.heatLayer(heatPoints, {
                radius: 25, // Radius for heat points
                blur: 15, // Blur to smooth the heatmap
                maxZoom: 12,
                gradient: {
                    0.2: "blue",
                    0.4: "lime",
                    0.6: "yellow",
                    0.8: "orange",
                    1.0: "red",
                },
            }).addTo(map);
        }
    }, []);

    return <div id="map" ref={mapRef} style={mapStyle}></div>;
};

export default MapComponent;
