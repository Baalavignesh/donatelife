import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../types/userInfo";

// Define interface for user information


// Define interface for the auth state
interface AuthState {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  userInfo: {
    username: "",
    donorOrganization: false,
    location: { lat: 0, long: 0 },
    _id: "",
    bloodGroup: "",
    phoneNumber: "",
    createdAt: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInformation: (state, action: PayloadAction<{ userInfo: UserInfo }>) => {
      state.userInfo = action.payload.userInfo;
    }
  },
});

export const { setUserInformation } = authSlice.actions;

export default authSlice.reducer;