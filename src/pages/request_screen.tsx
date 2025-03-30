import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../shared/navbar";
import { useParams } from "react-router-dom";
import MapComponent from "../shared/mapComponent";
import { GetUsersWithinRadius } from "../services/bank";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const RequestScreen = () => {
  const { reqNo } = useParams();
  const requestInfo = useSelector(
    (state: RootState) => state.requestStore.requestInfo
  );
  const bankInfo: any = useSelector(
    (state: RootState) => state.authStore.userInfo
  );
  const [bloodGroupPeople, setBloodGroupPeople] = useState<any[]>([]);
  const [radius, setRadius] = useState(10000); // Default radius in meters (10km)
  const [isLoading, setIsLoading] = useState(false);

  // Memoize the getInfo function so it doesn't change on every render
  const getInfo = useCallback(async (currentRadius: number) => {
    if (!bankInfo?.location || !requestInfo?.group) return;
    
    setIsLoading(true);
    try {
      // Convert radius from meters to kilometers for API call
      const radiusInKm = currentRadius / 1000;
      console.log(`Fetching data with radius: ${radiusInKm}km`);
      
      const data = await GetUsersWithinRadius(
        bankInfo.location.lat, 
        bankInfo.location.long, 
        radiusInKm, 
        requestInfo.group
      );
      
      console.log("Fetched data:", data);
      setBloodGroupPeople(data || []);
    } catch (error) {
      console.error("Error fetching users within radius:", error);
      setBloodGroupPeople([]);
    } finally {
      setIsLoading(false);
    }
  }, [bankInfo, requestInfo]);

  // Initial data load
  useEffect(() => {
    if (bankInfo?.location && requestInfo?.group) {
      getInfo(radius);
    }
  }, [getInfo, radius, bankInfo, requestInfo]);

  const increaseRadius = async () => {
    const newRadius = radius + 5000; // Increase by 5km
    setRadius(newRadius);
    await getInfo(newRadius);
  };

  const decreaseRadius = async () => {
    // Don't go below 1km
    const newRadius = Math.max(1000, radius - 5000); // Decrease by 5km with minimum of 1km
    setRadius(newRadius);
    await getInfo(newRadius);
  };

  return (
    <div className="bg-custom-black min-h-screen text-custom-white">
      <NavBar />
      <div className="p-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Request #{reqNo}</h1>

        {requestInfo && requestInfo._id ? (
          <div className="bg-secondary p-6 rounded-xl shadow mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {requestInfo.status}
              </div>
              <div>
                <span className="font-semibold">Blood Type:</span>{" "}
                {requestInfo.group}
              </div>
              <div>
                <span className="font-semibold">Urgency:</span>{" "}
                {requestInfo.urgency}
              </div>
              <div>
                <span className="font-semibold">Reached Users:</span>{" "}
                {requestInfo.reachedUsers?.length || 0}
              </div>
            </div>

            {/* Radius Control Section */}
            <div className="mt-4 p-3 border border-gray-700 rounded-lg bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faLocationDot} className="text-red-500" />
                  <span>Radius: {radius/1000} km</span>
                  {isLoading && (
                    <span className="ml-2 text-xs text-gray-400">Loading...</span>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={decreaseRadius}
                    disabled={isLoading}
                    className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors shadow-md flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Decrease
                    <FontAwesomeIcon icon={faArrowDown} className="ml-2" />
                  </button>
                  
                  <button 
                    onClick={increaseRadius}
                    disabled={isLoading}
                    className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors shadow-md flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Increase
                    <FontAwesomeIcon icon={faArrowUp} className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-yellow-400">Loading request information...</div>
        )}

        <MapComponent 
          bloodGroupPeople={bloodGroupPeople} 
          radius={radius} 
          key={`map-${radius}-${bloodGroupPeople.length}`} 
        />
      </div>
    </div>
  );
};

export default RequestScreen;
