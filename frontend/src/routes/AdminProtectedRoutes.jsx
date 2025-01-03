

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminProtectedRoutes = ({ children }) => {
  const {  isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    // toast.info('Please login to continue');
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'Admin'){
    toast.error('Access denied. Admins only.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoutes;