import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/assets');
        setAssets(response.data.assets);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axios.delete(`http://localhost:7000/api/assets/${id}`);
        setAssets(assets.filter(asset => asset.id !== id));
      } catch (error) {
        console.error('Error deleting asset:', error);
      }
    }
  };

  const filteredAssets = assets.filter(asset => 
    asset.asset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.asset_tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': { backgroundColor: '#10b981', color: 'white' },
      'Inactive': { backgroundColor: '#ef4444', color: 'white' },
      'Maintenance': { backgroundColor: '#f59e0b', color: 'white' },
      'Disposed': { backgroundColor: '#6b7280', color: 'white' }
    };

    const style = {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      ...statusStyles[status] || { backgroundColor: '#e5e7eb', color: '#374151' }
    };

    return <span style={style}>{status}</span>;
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#718096'
  };

  const containerStyle = {
    padding: '0',
    maxWidth: '100%',
  };

  const headerSectionStyle = {
    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    color: 'white',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  };

  const searchInputStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    minWidth: '300px',
    outline: 'none',
  };

  const addButtonStyle = {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '14px',
    borderBottom: '2px solid #e2e8f0',
  };

  const tdStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #f1f5f9',
    color: '#4a5568',
  };

  const actionButtonStyle = {
    padding: '6px 12px',
    margin: '0 4px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    textDecoration: 'none',
    display: 'inline-block',
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#f59e0b',
    color: 'white',
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#ef4444',
    color: 'white',
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div>Loading assets...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>🏗️ Asset Management</h1>
        <p>Track and manage your company assets and equipment</p>
      </div>

      {/* Controls Section */}
      <div style={controlsStyle}>
        <input
          type="text"
          placeholder="🔍 Search by asset name, tag, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <Link 
          to="/add-asset" 
          style={addButtonStyle}
        >
          ➕ Add Asset
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Asset Name</th>
              <th style={thStyle}>Asset Tag</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Purchase Date</th>
              <th style={thStyle}>Purchase Price</th>
              <th style={thStyle}>Current Value</th>
              <th style={thStyle}>Assigned To</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '32px', color: '#718096' }}>
                  {searchTerm ? 'No assets found matching your search' : 'No assets found'}
                </td>
              </tr>
            ) : (
              filteredAssets.map(asset => (
                <tr key={asset.id}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '600' }}>{asset.asset_name}</div>
                  </td>
                  <td style={tdStyle}>
                    <code style={{ 
                      backgroundColor: '#f1f5f9', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {asset.asset_tag}
                    </code>
                  </td>
                  <td style={tdStyle}>{asset.category}</td>
                  <td style={tdStyle}>{formatDate(asset.purchase_date)}</td>
                  <td style={tdStyle}>{formatCurrency(asset.purchase_price)}</td>
                  <td style={tdStyle}>{formatCurrency(asset.current_value)}</td>
                  <td style={tdStyle}>{asset.assigned_to || 'Unassigned'}</td>
                  <td style={tdStyle}>{getStatusBadge(asset.status)}</td>
                  <td style={tdStyle}>
                    <Link 
                      to={`/edit-asset/${asset.id}`} 
                      style={editButtonStyle}
                    >
                      ✏️ Edit
                    </Link>
                    <button 
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(asset.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;