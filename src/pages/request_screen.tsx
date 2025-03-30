import React, { useEffect, useState } from "react";
import NavBar from "../shared/navbar";
import { useParams } from "react-router-dom";
import MapComponent from "../shared/mapComponent";
import { getSpecificBloodGroup } from "../services/bank";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RequestScreen = () => {
  const { reqNo } = useParams();
  const requestInfo = useSelector(
    (state: RootState) => state.requestStore.requestInfo
  );
  const [bloodGroupPeople, setBloodGroupPeople] = useState<any[]>([]);

  const getInfo = async () => {
    let data = await getSpecificBloodGroup(requestInfo.group);
    console.log(data);
    setBloodGroupPeople(data);
  };

  useEffect(() => {
    console.log(reqNo);
    console.log("Request Info from Redux:", requestInfo);
    getInfo();
  }, [reqNo, requestInfo]);

  return (
    <div className="bg-custom-black min-h-screen text-custom-white">
      <NavBar />
      <div className="p-6 max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Request #{reqNo}</h1>

        {requestInfo && requestInfo._id ? (
          <div className="bg-secondary p-6 rounded-xl shadow mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {requestInfo.status}
              </div>
              <div>
                <span className="font-semibold">Blood Type:</span>{" "}
                {requestInfo.group}
              </div>
              <div>
                <span className="font-semibold">Urgency:</span>{" "}
                {requestInfo.urgency}
              </div>
              <div>
                <span className="font-semibold">Created At:</span>{" "}
                {new Date(requestInfo.createdAt).toLocaleString()}
              </div>
              <div>
                <span className="font-semibold">Reached Users:</span>{" "}
                {requestInfo.reachedUsers?.length || 0}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-yellow-400">Loading request information...</div>
        )}

        <MapComponent bloodGroupPeople={bloodGroupPeople} />
      </div>
    </div>
  );
};

export default RequestScreen;
