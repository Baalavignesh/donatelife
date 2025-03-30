import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interface for user information
interface UserInfo {
  username?: string;
  donorOrganization?: boolean;
  // Add other user properties as needed
  [key: string]: any; // Allow for other properties
}

// Define interface for the auth state
interface AuthState {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  userInfo: {},
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