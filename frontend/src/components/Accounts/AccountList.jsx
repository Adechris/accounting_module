import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/accounts');
        setAccounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await axios.delete(`http://localhost:7000/api/accounts/${id}`);
        setAccounts(accounts.filter(account => account.id !== id));
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  // Filter and search logic
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = 
      account.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.account_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'All' || account.account_type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const accountTypes = [...new Set(accounts.map(account => account.account_type))];

  // Styles
  const containerStyle = {
    padding: 0,
    maxWidth: '100%'
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
    marginBottom: '24px',
    position: 'relative',
    zIndex: 1
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap'
  };

  const searchFilterGroupStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flex: 1
  };

  const searchInputStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    minWidth: '300px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const selectStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: 'white',
    minWidth: '150px',
    outline: 'none'
  };

  const addButtonStyle = {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  };

  const tableHeaderStyle = {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0'
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '14px',
    borderRight: '1px solid #e2e8f0'
  };

  const tdStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #f1f5f9',
    borderRight: '1px solid #f1f5f9',
    color: '#4a5568'
  };

  const actionButtonStyle = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginRight: '8px',
    transition: 'all 0.2s ease'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#fbbf24',
    color: 'white'
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#ef4444',
    color: 'white'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#718096'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '48px 24px',
    color: '#718096'
  };

  const badgeStyle = {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  };

  const getBadgeColor = (type) => {
    const colors = {
      'Asset': { bg: '#dbeafe', color: '#1e40af' },
      'Liability': { bg: '#fecaca', color: '#dc2626' },
      'Equity': { bg: '#d1fae5', color: '#059669' },
      'Revenue': { bg: '#fef3c7', color: '#d97706' },
      'Expense': { bg: '#e0e7ff', color: '#5b21b6' }
    };
    return colors[type] || { bg: '#f3f4f6', color: '#374151' };
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div>
          <div style={{ marginBottom: '16px', fontSize: '24px' }}>⏳</div>
          Loading accounts...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <div style={decorativeCircleStyle}></div>
        <h1 style={titleStyle}>💰 Account Management</h1>
        <p style={subtitleStyle}>
          Manage your chart of accounts and financial structure
        </p>
      </div>

      {/* Controls Section */}
      <div style={controlsStyle}>
        <div style={searchFilterGroupStyle}>
          <input
            type="text"
            placeholder="🔍 Search by account name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Types</option>
            {accountTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <Link 
          to="/add-account" 
          style={addButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#3182ce'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4299e1'}
        >
          ➕ Add New Account
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        {filteredAccounts.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ color: '#4a5568', marginBottom: '8px' }}>No accounts found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={thStyle}>Code</th>
                <th style={thStyle}>Account Name</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Subtype</th>
                <th style={thStyle}>Parent ID</th>
                <th style={thStyle}>Description</th>
                <th style={{ ...thStyle, borderRight: 'none' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account, index) => (
                <tr 
                  key={account.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbfc'
                  }}
                >
                  <td style={{ ...tdStyle, fontWeight: '600', color: '#2d3748' }}>
                    {account.account_code}
                  </td>
                  <td style={tdStyle}>{account.account_name}</td>
                  <td style={tdStyle}>
                    <span 
                      style={{
                        ...badgeStyle,
                        backgroundColor: getBadgeColor(account.account_type).bg,
                        color: getBadgeColor(account.account_type).color
                      }}
                    >
                      {account.account_type}
                    </span>
                  </td>
                  <td style={tdStyle}>{account.account_subtype || '-'}</td>
                  <td style={tdStyle}>{account.parent_id || '-'}</td>
                  <td style={tdStyle}>
                    {account.description ? 
                      (account.description.length > 30 ? 
                        account.description.substring(0, 30) + '...' : 
                        account.description
                      ) : '-'
                    }
                  </td>
                  <td style={{ ...tdStyle, borderRight: 'none' }}>
                    <Link 
                      to={`/edit-account/${account.id}`}
                      style={editButtonStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#fbbf24'}
                    >
                      ✏️ Edit
                    </Link>
                    <button 
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(account.id)}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}
      {filteredAccounts.length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#718096'
        }}>
          Showing {filteredAccounts.length} of {accounts.length} accounts
        </div>
      )}
    </div>
  );
};

export default AccountList;