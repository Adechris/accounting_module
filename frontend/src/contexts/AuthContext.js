// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setUser(decodedToken);
//     }
//   }, [token]);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post('http://localhost:7000/api/auth/login', { username, password });
//       const { token, user } = response.data;
//       localStorage.setItem('token', token);
//       setToken(token);
//       setUser(user);
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//  ;

//   const register = async (userData) => {
//     try {
//       const response = await axios.post('http://localhost:7000/api/auth/register', userData);
//       console.log('Registration successful:', response.data);
//       navigate('/login');
//     } catch (error) {
//       if (error.response) {
//         console.error('Registration error:', error.response.data.message);
//       } else {
//         console.error('Registration error:', error);
//       }
//     }
//   };

//   const changePassword = async (currentPassword, newPassword) => {
//     try {
//       await axios.put('http://localhost:7000/api/auth/change-password', { currentPassword, newPassword });
//       console.log('Password changed successfully');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Change password error:', error);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setToken(null);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, changePassword, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };



import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isActive, setIsActive] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  
  const navigate = useNavigate();
  
  // Timer refs
  const inactivityTimer = useRef(null);
  const warningTimer = useRef(null);
  
  // Configuration (in milliseconds)
  const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutes
  const WARNING_TIME = 25 * 60 * 1000; // 25 minutes (5 min warning)
  
  // Cookie utilities
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };
  
  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };
  
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  
  // Reset inactivity timers
  const resetTimers = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    if (warningTimer.current) {
      clearTimeout(warningTimer.current);
    }
    
    setShowWarning(false);
    
    if (token && isActive) {
      // Set warning timer (5 minutes before logout)
      warningTimer.current = setTimeout(() => {
        setShowWarning(true);
      }, WARNING_TIME);
      
      // Set logout timer (30 minutes)
      inactivityTimer.current = setTimeout(() => {
        handleInactivityLogout();
      }, INACTIVITY_TIME);
      
      // Update last activity time in cookie
      setCookie('lastActivity', Date.now().toString(), 1);
    }
  }, [token, isActive]);
  
  // Handle inactivity logout
  const handleInactivityLogout = useCallback(() => {
    console.log('User logged out due to inactivity');
    logout('inactivity');
  }, []);
  
  // Activity detection
  const handleActivity = useCallback(() => {
    if (token) {
      resetTimers();
    }
  }, [token, resetTimers]);
  
  // Continue session (when user responds to warning)
  const continueSession = useCallback(() => {
    setShowWarning(false);
    handleActivity();
  }, [handleActivity]);
  
  // Check session validity on load
  useEffect(() => {
    const checkSession = () => {
      const savedToken = localStorage.getItem('token');
      const lastActivity = getCookie('lastActivity');
      
      if (savedToken && lastActivity) {
        const timeSinceActivity = Date.now() - parseInt(lastActivity);
        
        if (timeSinceActivity > INACTIVITY_TIME) {
          // Session expired due to inactivity
          console.log('Session expired due to inactivity');
          logout('expired');
          return;
        }
        
        // Check if token is still valid
        try {
          const decodedToken = JSON.parse(atob(savedToken.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            console.log('Token expired');
            logout('expired');
            return;
          }
          
          // Token is valid, set up timers
          setToken(savedToken);
          setUser(decodedToken);
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        } catch (error) {
          console.log('Invalid token');
          logout('invalid');
        }
      }
    };
    
    checkSession();
  }, []);
  
  // Set up timers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken);
        resetTimers();
      } catch (error) {
        console.error('Token decode error:', error);
        logout('invalid');
      }
    } else {
      // Clear timers when no token
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
    }
    
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
    };
  }, [token, resetTimers]);
  
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', { 
        username, 
        password 
      });
      
      const { token: newToken, user: userData } = response.data;
      
      // Store in localStorage and cookie
      localStorage.setItem('token', newToken);
      setCookie('authToken', newToken, 1); // 1 day expiry
      setCookie('lastActivity', Date.now().toString(), 1);
      
      setToken(newToken);
      setUser(userData);
      setIsActive(true);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw to handle in component
    }
  };
  
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:7000/api/auth/register', userData);
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Registration error:', error.response.data.message);
      } else {
        console.error('Registration error:', error);
      }
      throw error; // Re-throw to handle in component
    }
  };
  
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('http://localhost:7000/api/auth/change-password', { 
        currentPassword, 
        newPassword 
      });
      console.log('Password changed successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Change password error:', error);
      throw error; // Re-throw to handle in component
    }
  };
  
  const logout = (reason = 'manual') => {
    // Clear all timers
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);
    
    // Clear storage
    localStorage.removeItem('token');
    deleteCookie('authToken');
    deleteCookie('lastActivity');
    
    // Clear axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset state
    setToken(null);
    setUser(null);
    setIsActive(false);
    setShowWarning(false);
    
    // Navigate based on reason
    if (reason === 'inactivity' || reason === 'expired') {
      navigate('/login', { 
        state: { 
          message: 'Your session has expired due to inactivity. Please log in again.' 
        }
      });
    } else {
      navigate('/login');
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isActive,
      showWarning,
      login, 
      register, 
      changePassword, 
      logout,
      handleActivity,
      continueSession,
      resetTimers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };