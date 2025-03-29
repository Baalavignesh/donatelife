import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Fade } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    console.log("login screen");
  }, []);
  return (
    <div className="bg-custom-black">
      <Fade in={true} timeout={1000}>
        <div className="pl-24 pr-24 pt-12 h-screen text-custom-white bg-custom-black">
          <h1>Login Screen</h1>
          <button className="p-4 rounded-sm bg-primary" onClick={handleLogin}>
            Set Access Token
          </button>
        </div>
      </Fade>
    </div>
  );
};

export default Login;
