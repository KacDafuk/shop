import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../slices/authSlice";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunkMiddleware],
});
type RootState = ReturnType<typeof store.getState>;
export const selectAuth = (state: RootState) => state.auth;
