import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUser(decodedToken);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', { username, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // const register = async (userData) => {
  //   try {
  //     const response = await axios.post('http://localhost:7000/api/auth/register', userData);
  //     console.log('Registration successful:', response.data);
  //     navigate('/login');
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //   }
  // };

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
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put('http://localhost:7000/api/auth/change-password', { currentPassword, newPassword });
      console.log('Password changed successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Change password error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, changePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
