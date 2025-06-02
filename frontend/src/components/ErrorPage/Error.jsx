
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8fafc',
    color: '#2d3748',
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#f5576c'
  };

  const messageStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    opacity: '0.8'
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none'
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb'
  };

  const handleMouseEnter = (e) => {
    Object.assign(e.target.style, buttonHoverStyle);
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = '#3b82f6';
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>😞 Oops!</h1>
      <p style={messageStyle}>Something went wrong. The page you are looking for does not exist.</p>
      <button
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate('/')}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;