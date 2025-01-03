import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { toast } from "react-toastify";

const ProtectedRoutes = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const { deposit } = useSelector((state) => state.deposit);

  if (!isAuthenticated) {
    // toast.info(`Please login to continue`);
    return <Navigate to="/login" replace />;
  }
  if (!loading && deposit !== null && deposit <= 499) {
    <Navigate to={`/payment/${user.userId}`} replace />;
  }
  if (!loading && deposit !== null && deposit > 499) {
    <Navigate to={`/verification/${user.userId}`} replace />;
  }

  return children;
};

export default ProtectedRoutes;
