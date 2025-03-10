import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Se não há token, redireciona para o login
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;