import React from "react";
import { Navigate } from "react-router-dom";
import SpinnerLoader from "../../Components/SpinnerLoader";
import useRole from "../../hooks/useRole";

const CreatorRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <SpinnerLoader />;
  if (role === "creator") return children;
  return <Navigate to="/dashboard" />;
};

export default CreatorRoute;
