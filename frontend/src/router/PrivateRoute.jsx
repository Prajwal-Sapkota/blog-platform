import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!user && !token) {
    // Not logged in → redirect to login
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
