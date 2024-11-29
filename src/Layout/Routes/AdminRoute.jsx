import React from "react";
import { Navigate } from "react-router-dom";
import SpinnerLoader from "../../Components/SpinnerLoader";
import useRole from "../../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <SpinnerLoader />;
  if (role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
