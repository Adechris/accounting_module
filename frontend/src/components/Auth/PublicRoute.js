import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
// import { AuthContext } from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  
  // If user is already authenticated, redirect to dashboard
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // If token is still valid, redirect to dashboard
      if (decodedToken.exp >= currentTime) {
        return <Navigate to="/dashboard" replace />;
      }
    } catch (error) {
      // If token is malformed, remove it and continue to show public route
      localStorage.removeItem('token');
    }
  }
  
  // If not authenticated or token expired, render the public component
  return children;
};

export default PublicRoute;