import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Error from "./pages/error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/" Component={Login} />
        <Route path="*" Component={Error} />
      </Routes>
    </Router>
  );
}

export default App;
