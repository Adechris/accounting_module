import React, { useState, useEffect } from 'react';

const EditAccount = () => {
  const [account, setAccount] = useState({
    account_code: 'ACC-001',
    account_name: 'Cash and Cash Equivalents',
    account_type: 'Assets',
    account_subtype: 'Current Assets',
    parent_id: '',
    description: 'Primary cash account for day-to-day operations and liquid investments'
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    // Simulate API call
    setTimeout(() => {
      alert('Account updated successfully!');
      setUpdating(false);
    }, 2000);
  };

  const handleCancel = () => {
    alert('Edit cancelled');
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

  const decorativeCircleStyle = {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%'
  };

  const decorativeCircle2Style = {
    position: 'absolute',
    bottom: '-30px',
    left: '-30px',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '50%'
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
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1
  };

  const accountInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
    zIndex: 1
  };

  const iconStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '20px'
  };

  const accountDetailsStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const accountNameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px'
  };

  const accountCodeStyle = {
    fontSize: '14px',
    opacity: '0.8'
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    marginBottom: '32px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const sectionHeaderStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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

  const inputFocusStyle = {
    borderColor: '#667eea',
    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
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
    backgroundColor: updating ? '#9ca3af' : '#667eea',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '2px solid #e5e7eb'
  };

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: '#718096'
  };

  const loadingSpinnerStyle = {
    fontSize: '48px',
    marginBottom: '16px',
    animation: 'spin 2s linear infinite'
  };

  const accountTypeOptions = [
    'Assets',
    'Liabilities',
    'Equity',
    'Revenue',
    'Expenses'
  ];

  const assetSubtypes = ['Current Assets', 'Fixed Assets', 'Intangible Assets'];
  const liabilitySubtypes = ['Current Liabilities', 'Long-term Liabilities'];
  const equitySubtypes = ['Owner\'s Equity', 'Retained Earnings'];
  const revenueSubtypes = ['Operating Revenue', 'Non-operating Revenue'];
  const expenseSubtypes = ['Operating Expenses', 'Non-operating Expenses'];

  const getSubtypeOptions = () => {
    switch (account.account_type) {
      case 'Assets':
        return assetSubtypes;
      case 'Liabilities':
        return liabilitySubtypes;
      case 'Equity':
        return equitySubtypes;
      case 'Revenue':
        return revenueSubtypes;
      case 'Expenses':
        return expenseSubtypes;
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerSectionStyle}>
          <div style={decorativeCircleStyle}></div>
          <div style={decorativeCircle2Style}></div>
          <h1 style={titleStyle}>✏️ Edit Account</h1>
          <p style={subtitleStyle}>Loading account information...</p>
        </div>
        <div style={formContainerStyle}>
          <div style={loadingContainerStyle}>
            <div style={loadingSpinnerStyle}>⏳</div>
            <h3 style={{marginBottom: '8px'}}>Loading Account Data</h3>
            <p>Please wait while we fetch the account information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <div style={decorativeCircleStyle}></div>
        <div style={decorativeCircle2Style}></div>
        <h1 style={titleStyle}>✏️ Edit Account</h1>
        <p style={subtitleStyle}>
          Update account information and save changes
        </p>
        <div style={accountInfoStyle}>
          <div style={iconStyle}>
            📊
          </div>
          <div style={accountDetailsStyle}>
            <div style={accountNameStyle}>
              {account.account_name || 'Account Name'}
            </div>
            <div style={accountCodeStyle}>
              Account Code: {account.account_code}
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <div onSubmit={handleSubmit}>
          
          {/* Account Identification Section */}
          <div style={sectionHeaderStyle}>
            🆔 Account Identification
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Account Code *</label>
              <input
                type="text"
                name="account_code"
                value={account.account_code}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Enter account code (e.g., 1001)"
              />
              <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                Unique identifier for this account
              </div>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Account Name *</label>
              <input
                type="text"
                name="account_name"
                value={account.account_name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Enter account name"
              />
            </div>
          </div>

          {/* Account Classification Section */}
          <div style={sectionHeaderStyle}>
            📂 Account Classification
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Account Type *</label>
              <select
                name="account_type"
                value={account.account_type}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              >
                <option value="">Select Account Type</option>
                {accountTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Account Subtype *</label>
              <select
                name="account_subtype"
                value={account.account_subtype}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                disabled={!account.account_type}
              >
                <option value="">Select Account Subtype</option>
                {getSubtypeOptions().map(subtype => (
                  <option key={subtype} value={subtype}>{subtype}</option>
                ))}
              </select>
              {!account.account_type && (
                <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                  Please select an account type first
                </div>
              )}
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Parent Account ID</label>
              <input
                type="text"
                name="parent_id"
                value={account.parent_id}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                placeholder="Enter parent account ID (optional)"
              />
              <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                Leave blank if this is a top-level account
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div style={sectionHeaderStyle}>
            📝 Account Details
          </div>
          <div style={formGridStyle}>
            <div style={{...inputGroupStyle, gridColumn: '1 / -1'}}>
              <label style={labelStyle}>Description</label>
              <textarea
                name="description"
                value={account.description}
                onChange={handleChange}
                style={textareaStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                placeholder="Enter a detailed description of this account..."
                rows="4"
              />
              <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                Provide additional context about this account's purpose
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={handleCancel}
              style={secondaryButtonStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={primaryButtonStyle}
              disabled={updating}
              onMouseEnter={(e) => !updating && (e.target.style.backgroundColor = '#5a67d8')}
              onMouseLeave={(e) => !updating && (e.target.style.backgroundColor = '#667eea')}
            >
              {updating ? '⏳ Updating Account...' : '💾 Update Account'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EditAccount;