import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Verifica se existe o token de autenticação (ajuste conforme sua lógica)
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
