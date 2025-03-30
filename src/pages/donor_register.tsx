import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "@mui/material";
import { registerUser } from "../services/auth";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    phoneNumber: "",
    location: {
      lat: 0,
      long: 0,
    },
  });
  const [error, setError] = useState("");

  const getAddress = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        }));
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup ||
      !formData.location.lat ||
      !formData.location.long ||
      !formData.phoneNumber
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await registerUser(formData);
    console.log(response);
  };

  return (
    <div className="bg-custom-black min-h-screen flex flex-col items-center justify-center py-8">
      <Fade in={true} timeout={1000}>
        <div className="w-full max-w-md p-8 space-y-8 rounded-xl bg-custom-black text-custom-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Donate Life</h1>
            <p className="text-lg text-custom-white mb-6">Create an account</p>
          </div>

          {error && (
            <div className="p-3 bg-danger/20 text-danger rounded-lg text-center mb-4">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium mb-2">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
              >
                <option value="">Select blood group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Get Location</label>
              <button
                type="button"
                onClick={getAddress}
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary hover:bg-secondary/80 transition-colors"
              >
                Get Location
              </button>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address - Latitude and Longitude
              </label>
              <input
                id="address"
                name="address"
                type="text"
                disabled
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                value={`${formData.location.lat} ${formData.location.long}`}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full p-3 text-center rounded-lg bg-primary hover:bg-primary/90 text-custom-white transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p>
              Already have an account?{' '}
              <button
                className="text-primary hover:underline focus:outline-none"
                onClick={() => navigate("/")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default DonorRegister;

