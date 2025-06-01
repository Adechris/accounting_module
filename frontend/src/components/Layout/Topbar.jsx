import React, {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext';

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);

  const topbarStyle = {
    height: '70px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'fixed',
    top: 0,
    left: '280px',
    right: 0,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const titleStyle = {
    margin: 0,
    color: '#2d3748',
    fontWeight: '600',
    fontSize: '24px'
  };

  const dateStyle = {
    backgroundColor: '#f7fafc',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#4a5568'
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const statusBadgeStyle = {
    backgroundColor: '#e6fffa',
    color: '#00b894',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const userInfoStyle = {
    textAlign: 'right'
  };

  const usernameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748'
  };

  const roleStyle = {
    fontSize: '12px',
    color: '#718096'
  };

  const logoutButtonStyle = {
    backgroundColor: 'transparent',
    color: '#e53e3e',
    border: '1px solid #e53e3e',
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={topbarStyle}>
      {/* Search and Title Section */}
      <div style={leftSectionStyle}>
        <h3 style={titleStyle}>
          Dashboard
        </h3>
        <div style={dateStyle}>
          📅 {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* User Section */}
      <div style={rightSectionStyle}>
        <div style={statusBadgeStyle}>
          🟢 Online
        </div>
        <div style={userInfoStyle}>
          <div style={usernameStyle}>
            Welcome, {user?.username}
          </div>
          <div style={roleStyle}>
            {user?.role}
          </div>
        </div>
        <button
          style={logoutButtonStyle}
          onClick={logout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e53e3e';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#e53e3e';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar