import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.age ||
      !formData.address ||
      !formData.phoneNumber
    ) {
      setError("Please fill in all fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (parseInt(formData.age) < 18) {
      setError("You must be at least 18 years old to register");
      return;
    }
    
    // In a real app, you would send this data to an API
    // For now, just navigate to login
    navigate("/");
  };

  return (
    <div className="bg-custom-black min-h-screen flex flex-col items-center justify-center py-8">
      <Fade in={true} timeout={1000}>
        <div className="w-full max-w-md p-8 space-y-8 rounded-xl bg-custom-black text-custom-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Donate Life</h1>
            <p className="text-lg text-custom-white mb-6">Create an account</p>
          </div>
          
          {error && <div className="p-3 bg-danger/20 text-danger rounded-lg text-center mb-4">{error}</div>}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
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
                required
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
                required
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium mb-2">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                min="18"
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="w-full p-3 rounded-lg bg-secondary text-custom-white border border-secondary focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
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
                required
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

export default Register; 