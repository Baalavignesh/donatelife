import { useNavigate } from "react-router-dom";
import NavBar from "../shared/navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpecificBankRequest } from "../services/donor";
import DonorCard from "../shared/donorcard";

interface UserInfo {
  username: string; // Required field
  donorOrganization?: boolean;
  location: { lat: number; long: number }; // Added location property
  _id: string; // Added _id property
  bloodGroup: string; // Added bloodGroup property
  phoneNumber: string; // Added phoneNumber property
  createdAt: string; // Added createdAt property
  [key: string]: any; // Allow for other properties
}

interface MyRequests {
  
    createdAt: string;
    group: string;
    id: string;
    location: { lat: number; long: number };
    reachedUsers: any[];
    status: string;
    updatedAt: string;
    urgency: string;
    __v: number;
    _id: string;
  
}

const UserDashboard = () => {
  const navigate = useNavigate();


  // FETCH DATA RECORDS FROM MONGODB AND STORE IN REQUESTS
  const requests = [
    { reqNo: "001", status: "Pending", bloodType: "A+", urgency: "High" },
    { reqNo: "002", status: "Fulfilled", bloodType: "B-", urgency: "Low" },
    { reqNo: "003", status: "Pending", bloodType: "O+", urgency: "High" },
  ];

  const user: UserInfo = useSelector((state: any) => state.authStore.userInfo);
    const [myRequests, setMyRequests] = useState<[]>([]);

    const getMyRequests = async () => {
        const response = await getSpecificBankRequest(user.bloodGroup);
        setMyRequests(response);
      };


  useEffect(() => {
    
    getMyRequests();
  }, []);
  return (
    <div className="bg-custom-black min-h-screen text-custom-white">
      <NavBar />
      <div className="flex gap-4 p-6 max-w-screen-lg">

        {myRequests.map((request: MyRequests, index: number) => (
          <DonorCard key={index} cardInfo={request} reqNo={index} status={request.status} bloodType={request.group} urgency={request.urgency} />
        ))} 
      </div>
    </div>
  );
};

export default UserDashboard;
