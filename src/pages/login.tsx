import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Fade } from "@mui/material";
import { setUserInformation } from "../features/auth/authSlice";
import { LoginUser } from "../services/auth";

// Define interface for user information
interface UserInfo {
  _id: string; // Assuming ObjectId is represented as a string
  username: string;
  password: string;
  bloodGroup: string;
  location: {
    lat: number;
    long: number;
  };
  phoneNumber: string;
  createdAt: string; // Assuming date is represented as a string
  donorOrganization?: boolean;
  __v: number;
  [key: string]: any; // Allow for other properties
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    const response = await LoginUser(username, password);
    console.log(response)
    if (response.success === true) {
      // Store user information in Redux
      dispatch(
        setUserInformation({
          userInfo: response.userInfo as UserInfo,
        })
      );
      // Navigate based on user type
      if(response.userInfo.donorOrganization){
        navigate("/bankdashboard"); 
      }else{
        navigate("/userdashboard");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-custom-black min-h-screen flex flex-col items-center justify-center">
      <Fade in={true} timeout={1000}>
        <div className="w-full max-w-md p-8 space-y-8 rounded-xl bg-custom-black text-custom-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">Donate Life</h1>
            <p className="text-lg text-custom-white mb-8">Sign in to your account</p>
          </div>
          
          {error && <div className="p-3 bg-danger/20 text-danger rounded-lg text-center">{error}</div>}
          
          <form className="space-y-6" onSubmit={handleLogin}>
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
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full p-3 text-center rounded-lg bg-primary hover:bg-primary/90 text-custom-white transition-colors duration-200"
              >
                Sign In
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <p>
              Don't have an account?{" "}
              <button 
                className="text-primary hover:underline focus:outline-none"
                onClick={() => navigate("/donorregister")}
              >
                Register now
              </button>
            </p>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Login;
