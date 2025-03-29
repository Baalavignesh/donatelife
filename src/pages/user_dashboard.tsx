import { useNavigate } from "react-router-dom";
import Card from "../shared/card";
import NavBar from "../shared/navbar";

const UserDashboard = () => {
  const navigate = useNavigate();

  // FETCH DATA RECORDS FROM MONGODB AND STORE IN REQUESTS
  const requests = [
    { reqNo: "001", status: "Pending", bloodType: "A+", urgency: "High" },
    { reqNo: "002", status: "Fulfilled", bloodType: "B-", urgency: "Low" },
    { reqNo: "003", status: "Pending", bloodType: "O+", urgency: "High" },
  ];

  return (
    <div className="bg-custom-black min-h-screen text-custom-white">
      <NavBar />
    </div>
  );
};

export default UserDashboard;
