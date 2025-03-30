import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserInformation } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { RootState } from "../store/store";
import { UserInfo } from "../types/userInfo"; 

const NavBar: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // Fix: Update the selector with proper typing
  const userInfo = useSelector((state: RootState) => state.authStore.userInfo) as UserInfo;
  let [isOrg, setIsOrg] = useState<boolean>(false);  

  const handleLogout = () => {
    dispatch(
      setUserInformation({
        userInfo: {} as UserInfo,
      })
    );
    navigate("/"); // Navigate back to login after logout
  };

  useEffect(() => {
    // Check if userInfo and donorOrganization exist
    if (userInfo && userInfo.donorOrganization) {
      setIsOrg(true);
    } else {
      setIsOrg(false);
    }
  }, [userInfo]); // Add userInfo as dependency to re-run when it changes

  return (
    <div className="p-4 pl-24 pr-24 flex justify-between items-center bg-custom-black text-white border-b border-primary">
      <h2 onClick={() => navigate("/dashboard")} className="cursor-pointer">
        Donate Life
      </h2>
      <div className="flex gap-12 items-center">
        {/* Display username if available */}
        {userInfo && userInfo.username && (
          <span className="text-custom-white">
            Welcome, {userInfo.username}
          </span>
        )}
        
        {isOrg && (
          <button
            onClick={() => navigate("/postreq")}
            className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition text-center"
          >
            Add Requirement
          </button>
        )}
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-lg transition text-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default NavBar;
