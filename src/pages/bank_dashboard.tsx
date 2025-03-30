import { useNavigate } from "react-router-dom";
import Card from "../shared/card";
import NavBar from "../shared/navbar";
import { useEffect, useState   } from "react";
import { useSelector } from "react-redux";
import { getAllRequests } from "../services/bank";

export interface Location {
  lat: number;
  long: number;
}

export interface ReachedUser {
  lat: number;
  long: number;
}

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type RequestStatus = "pending" | "fulfilled";
export type UrgencyLevel = "Low" | "High";

export interface BankRequest {
  _id: string;
  id: string;
  location: Location;
  status: RequestStatus;
  group: BloodGroup;
  urgency: UrgencyLevel;
  reachedUsers: ReachedUser[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


const Dashboard = () => {
  const navigate = useNavigate();

  let [myRequests, setMyRequests] = useState([]);
  const GetRequests = async (username: string) => {
    const requests = await getAllRequests(username);
    console.log(requests.length);
    setMyRequests(requests);
  }
  const user = useSelector((state: any) => state.authStore.userInfo);

  useEffect(() => {
    GetRequests(user.username);
  }, []);


  return (
    <div className="bg-custom-black min-h-screen text-custom-white">
      <NavBar />
      

      {/* Cards Section */}
      <div className="flex gap-4 p-6 max-w-screen-lg">
          {myRequests.map((request: BankRequest, index) => (
          <Card
            key={index}
            _id={request._id}
            reqNo={index + 1}
            status={request.status}
            bloodType={request.group}
            urgency={request.urgency}
            location={request.location}
            reachedUsers={request.reachedUsers}
            reachedUsersCount={myRequests.length}
            createdAt={request.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
