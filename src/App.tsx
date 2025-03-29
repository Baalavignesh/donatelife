import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Error from "./pages/error";
import PostReq from "./pages/postreq"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/register" Component={Register} />
        <Route path="/postreq" Component={PostReq} /> {/* ✅ New route */}
        <Route path="/" Component={Login} />
        <Route path="*" Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
