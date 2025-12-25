import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../Common/Loader";

export default function ProtectedRoutes() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return <Outlet />;
}
