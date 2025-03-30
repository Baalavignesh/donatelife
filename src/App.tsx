import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/bank_dashboard";
import Login from "./pages/login";
import Error from "./pages/error";
import Leaflet from "./shared/mapComponent";
import DonorRegister from "./pages/donor_register";
import PostReq from "./pages/postreq";
import BankRegister from "./pages/bank_register";
import UserDashboard from "./pages/user_dashboard";
import RequestScreen from "./pages/request_screen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bankdashboard" Component={Dashboard} />
        <Route path="/userdashboard" Component={UserDashboard} />
        <Route path="/donorregister" Component={DonorRegister} />
        <Route path="/bankregister" Component={BankRegister} />
        <Route path="/bankdashboard/:reqNo" Component={RequestScreen} />
        <Route path="/postreq" Component={PostReq} />
        <Route path="/" Component={Login} />
        <Route path="*" Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
