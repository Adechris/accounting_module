import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Optional: Check if token is expired
  try {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // If token is expired, redirect to login
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
      }
    }
  } catch (error) {
    // If token is malformed, redirect to login
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;