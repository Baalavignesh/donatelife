import { useDispatch } from "react-redux";
import { setRequestInformation } from "../features/requestSlice";
import { ReachedUser, Location } from "../pages/bank_dashboard";
import { useNavigate } from "react-router-dom";

interface CardProps {
    _id: string;
    reqNo: number;
    status: string;
    bloodType: string;
    urgency: string;
    location: Location;
    reachedUsers: ReachedUser[];
    createdAt: string;
  }
  
  
  export default function Card({ _id, reqNo, status, bloodType, urgency, location, reachedUsers, createdAt }: CardProps) {
    const urgencyColor = urgency === "High" ? "bg-red-500" : "bg-yellow-400";
    const statusColor = status === "Fulfilled" ? "text-green-400" : "text-red-400";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
      <div className="w-full max-w-sm bg-secondary text-custom-white p-6 rounded-xl shadow border border-secondary space-y-4 hover:cursor-pointer hover:scale-105 transition-all duration-300 " onClick={() => {
        console.log(_id);
        dispatch(setRequestInformation({ requestInfo: { _id: _id, location: location, status: status, group: bloodType, urgency: urgency, reachedUsers: reachedUsers, createdAt: createdAt } }));
        navigate(`/bankdashboard/${reqNo}`);
      }}>
        <div className="flex justify-between">
          <span className="text-base font-semibold">Req. No:</span>
          <span className="text-base font-medium">{reqNo}</span>
        </div>
  
        <div className="flex justify-between">
          <span className="text-base font-semibold">Status:</span>
          <span className={`text-base font-bold ${statusColor}`}>{status}</span>
        </div>
  
        <div className="flex justify-between">
          <span className="text-base font-semibold">Blood Type:</span>
          <span className="text-xl font-extrabold">{bloodType}</span>
        </div>
  
        <div className="flex justify-between">
          <span className="text-base font-semibold">Urgency:</span>
          <span
            className={`px-4 py-1 text-base font-bold rounded-full ${urgencyColor} text-black`}
          >
            {urgency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-semibold">Reached Users:</span>
          <span className="text-base font-medium">{reachedUsers.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-semibold">Created At:</span>
          <span className="text-base font-medium">{new Date(createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        </div>
        </div>
    );
  }
  