import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Error from "./pages/error";
import PostReq from "./pages/postreq"; 
import DonorRegister from "./pages/donor_register";
import UserDashboard from "./pages/user_dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/register" Component={Register} />
        <Route path="/donorregister" Component={DonorRegister} />
        <Route path="/userdashboard" Component={UserDashboard} />
        <Route path="/postreq" Component={PostReq} />
        <Route path="/" Component={Login} />
        <Route path="*" Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
