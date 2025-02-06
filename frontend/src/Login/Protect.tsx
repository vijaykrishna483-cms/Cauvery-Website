import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  isAdmin: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isAdmin }) => {
  return isAdmin ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
