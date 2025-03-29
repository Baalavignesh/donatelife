import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "@mui/material";
import { registerDonar, registerUser } from "../services/auth";

const DonorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    donorOrganization: "",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Simple validation
    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.donorOrganization ||
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

    if (formData.donorOrganization === "") {
      setError("You must enter a donor organization");
      return;
    }

    const response = await registerDonar(formData);
    console.log(response);
    if(response.success){
        navigate("/")
    }else{  
        setError(response.message)
    }

    // navigate("/");   
  };

  return (
    <div className="bg-custom-black min-h-screen flex flex-col items-center justify-center py-8">
      <Fade in={true} timeout={1000}>
        <div className="w-full max-w-md p-8 space-y-8 rounded-xl bg-custom-black text-custom-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">
              Donate Life
            </h1>
            <p className="text-lg text-custom-white mb-6">Create an account</p>
          </div>

          {error && (
            <div className="p-3 bg-danger/20 text-danger rounded-lg text-center mb-4">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
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
              <label
                htmlFor="donorOrganization"
                className="block text-sm font-medium mb-2"
              >
                Donor Organization
              </label>
              <input
                id="donorOrganization"
                name="donorOrganization"
                type="text"
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Enter your donor organization"
                value={formData.donorOrganization}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="getLocation"
                className="block text-sm font-medium mb-2"
              >
                Location - Latitude and Longitude
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={getAddress}
                  className="w-2/3 p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none hover:bg-secondary/80 transition-colors duration-200 "
                >
                  Get Location
                </button>
                <input
                  id="address"
                  name="address"
                  type="text"
                  disabled
                  className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                  placeholder="Latitude and Longitude"
                  value={formData.location.lat + " " + formData.location.long}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium mb-2"
              >
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
              Already have an account?{" "}
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
