import { useState } from "react";
import { Fade } from "@mui/material";

// Tailwind style variables
const inputBase =
  "p-2 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none";
const buttonBase = "p-2 rounded-lg transition-colors duration-200";
const selectedButton = "bg-primary text-white border-primary";
const unselectedButton = "bg-secondary text-custom-white border-secondary";
const sectionTitle = "block text-sm font-medium";

// Static options
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const urgencyLevels = ["High", "Low"];

const PostReq = () => {
  const [req, setReq] = useState({
    group: "A+",
    location: { lat: 0, long: 0 },
    urgency: "Low",
  });

  const [locationMode, setLocationMode] = useState<"current" | "manual">("current");
  const [error, setError] = useState("");

  // Geolocation handler
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setReq((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          }));
          setError("");
        },
        () => {
          setError("Failed to get current location.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="bg-custom-black min-h-screen flex flex-col items-center justify-center py-8">
      <Fade in={true} timeout={1000}>
        <div className="w-full max-w-md p-8 space-y-8 rounded-xl bg-custom-black text-custom-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Post Requirement</h1>
            <p className="text-lg text-custom-white mb-6">
              Fill in the details for a blood requirement
            </p>
          </div>

          {error && (
            <div className="p-3 bg-danger/20 text-danger rounded-lg text-center mb-4">
              {error}
            </div>
          )}

          {/* Location Input Method */}
          <div className="space-y-2">
            <label className={sectionTitle}>Choose Location Input Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="locationMode"
                  value="current"
                  checked={locationMode === "current"}
                  onChange={() => setLocationMode("current")}
                />
                <span className="text-custom-white">Use Current Location</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="locationMode"
                  value="manual"
                  checked={locationMode === "manual"}
                  onChange={() => setLocationMode("manual")}
                />
                <span className="text-custom-white">Enter Coordinates</span>
              </label>
            </div>
          </div>

          {/* Location Input */}
          {locationMode === "current" && (
            <button
              onClick={handleGetCurrentLocation}
              className={`w-full mt-2 ${buttonBase} ${unselectedButton}`}
            >
              Get Current Location
            </button>
          )}

          {locationMode === "manual" && (
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={req.location.lat}
                onChange={(e) =>
                  setReq((prev) => ({
                    ...prev,
                    location: { ...prev.location, lat: parseFloat(e.target.value) || 0 },
                  }))
                }
                className={`flex-1 ${inputBase}`}
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={req.location.long}
                onChange={(e) =>
                  setReq((prev) => ({
                    ...prev,
                    location: { ...prev.location, long: parseFloat(e.target.value) || 0 },
                  }))
                }
                className={`flex-1 ${inputBase}`}
              />
            </div>
          )}

          <p className="text-sm text-custom-white mt-2">
            📍 Latitude: {req.location.lat.toFixed(4)}, Longitude: {req.location.long.toFixed(4)}
          </p>

          {/* Blood Group */}
          <div className="space-y-2 mt-4">
            <label className={sectionTitle}>Blood Type</label>
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setReq((prev) => ({ ...prev, group }))}
                  className={`p-2 rounded-lg border ${
                    req.group === group ? selectedButton : unselectedButton
                  } hover:bg-primary/80 ${buttonBase}`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-2 mt-4">
            <label className={sectionTitle}>Urgency</label>
            <div className="flex gap-2">
              {urgencyLevels.map((urgency) => (
                <button
                  key={urgency}
                  onClick={() => setReq((prev) => ({ ...prev, urgency }))}
                  className={`flex-1 border ${
                    req.urgency === urgency ? selectedButton : unselectedButton
                  } hover:bg-primary/80 ${buttonBase}`}
                >
                  {urgency}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <button
              onClick={() => console.log("Request submitted:", req)}
              className={`w-full p-3 ${buttonBase} ${selectedButton}`}
            >
              Submit Requirement
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default PostReq;
