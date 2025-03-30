import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Request } from "../types/request";

// Define interface for user information

// Define interface for the auth state
interface RequestState {
  requestInfo: Request;
}

const initialState: RequestState = {
  requestInfo: {
    _id: "",
    location: {},
    status: "",
    group: "",
    urgency: "",
    reachedUsers: [],
    createdAt: "",
    updatedAt: "",
  },
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequestInformation: (
      state,
      action: PayloadAction<{ requestInfo: Request }>
    ) => {
      state.requestInfo = action.payload.requestInfo;
    },
  },
});

export const { setRequestInformation } = requestSlice.actions;

export default requestSlice.reducer;
