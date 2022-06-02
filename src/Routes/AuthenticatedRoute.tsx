import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../store/Store";
import { Route, Outlet, Navigate } from "react-router-dom";

const AuthenticatedRoute = () => {
  const { user } = useSelector(selectAuth);
  return (
    <React.Fragment>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </React.Fragment>
  );
};

export default AuthenticatedRoute;
