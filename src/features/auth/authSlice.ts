import { createSlice } from "@reduxjs/toolkit";

const userInformation = {
  userInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: userInformation,
  reducers: {
    setUserInformation: (state, action) => {
      state.userInfo = action.payload.userInfo;
    }
  },
});

export const { setUserInformation } = authSlice.actions;

export default authSlice.reducer;