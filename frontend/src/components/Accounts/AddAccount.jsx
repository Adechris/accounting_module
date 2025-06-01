import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAccount = () => {
  const [account, setAccount] = useState({
    account_code: '',
    account_name: '',
    account_type: '',
    account_subtype: '',
    parent_id: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/accounts', account);
      navigate('/accounts');
    } catch (error) {
      console.error('Error adding account:', error);
    }
  };

  // Styles
  const containerStyle = {
    padding: 0,
    maxWidth: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  };

  const headerSectionStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
    position: 'relative',
    zIndex: 1
  };

  const subtitleStyle = {
    fontSize: '16px',
    opacity: '0.9',
    position: 'relative',
    zIndex: 1
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    marginBottom: '32px'
  };

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#ffffff'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0'
  };

  const buttonBaseStyle = {
    padding: '12px 32px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const primaryButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#10b981',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '2px solid #e5e7eb'
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>➕ Add New Account</h1>
        <p style={subtitleStyle}>
          Enter account information to add it to your system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          {/* Account Information Section */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Account Code *</label>
            <input
              type="text"
              name="account_code"
              value={account.account_code}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter account code"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Account Name *</label>
            <input
              type="text"
              name="account_name"
              value={account.account_name}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter account name"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Account Type *</label>
            <input
              type="text"
              name="account_type"
              value={account.account_type}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter account type"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Account Subtype *</label>
            <input
              type="text"
              name="account_subtype"
              value={account.account_subtype}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter account subtype"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Parent ID</label>
            <input
              type="text"
              name="parent_id"
              value={account.parent_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter parent account ID (if any)"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={account.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
              placeholder="Enter account description"
            />
          </div>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={() => navigate('/accounts')}
              style={secondaryButtonStyle}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={primaryButtonStyle}
            >
              ✅ Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;