import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import the localStorage storage engine
import authReducer from "../features/auth/authSlice";
import requestReducer from "../features/requestSlice";

const authPersistConfig = {
  key: "auth",
  storage, 
};

const requestPersistConfig = {
  key: "request",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedRequestReducer = persistReducer(requestPersistConfig, requestReducer);

export const store = configureStore({
  reducer: {
    authStore: persistedAuthReducer,
    requestStore: persistedRequestReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
