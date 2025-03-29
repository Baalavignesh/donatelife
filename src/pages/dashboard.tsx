import { useNavigate } from "react-router-dom";
import Card from "../shared/card";

const Dashboard = () => {
  const navigate = useNavigate();

  // FETCH DATA RECORDS FROM MONGODB AND STORE IN REQUESTS
  const requests = [
    { reqNo: "001", status: "Pending", bloodType: "A+", urgency: "High" },
    { reqNo: "002", status: "Fulfilled", bloodType: "B-", urgency: "Low" },
    { reqNo: "003", status: "Pending", bloodType: "O+", urgency: "High" },
  ];

  return (
    <div className="bg-custom-black min-h-screen text-custom-white">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-secondary border-b border-primary">
        <h1 className="text-2xl font-bold text-primary">Blood Bank Dashboard</h1>
        <button
          onClick={() => navigate("/postreq")}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition"
        >
          Add Requirement
        </button>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col items-center gap-6 p-6">
        {requests.map((request, index) => (
          <Card
            key={index}
            reqNo={request.reqNo}
            status={request.status}
            bloodType={request.bloodType}
            urgency={request.urgency}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
