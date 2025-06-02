import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAsset = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState({
    asset_name: '',
    asset_tag: '',
    category: '',
    purchase_date: '',
    purchase_price: '',
    current_value: '',
    department_id: '',
    assigned_to: '',
    status: ''
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/assets/${id}`);
        const assetData = {
          ...response.data.asset,
          purchase_date: response.data.asset.purchase_date ? response.data.asset.purchase_date.split('T')[0] : ''
        };
        setAsset(assetData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching asset:', error);
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:3000/api/assets/${id}`, asset);
      navigate('/assets');
    } catch (error) {
      console.error('Error updating asset:', error);
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate('/assets');
  };

  // Styles
  const containerStyle = {
    padding: 0,
    maxWidth: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  };

  const headerSectionStyle = {
    background: 'linear-gradient(135deg, #6ee7b7 0%, #3b82f6 100%)',
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
    marginBottom: '8px'
  };

  const subtitleStyle = {
    fontSize: '16px',
    opacity: '0.9',
    marginBottom: '20px'
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

  const primaryButtonStyle = {
    padding: '12px 32px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: updating ? '#9ca3af' : '#3b82f6',
    color: 'white',
    transition: 'all 0.3s ease'
  };

  const secondaryButtonStyle = {
    padding: '12px 32px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: '2px solid #e5e7eb',
    backgroundColor: '#f3f4f6',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerSectionStyle}>
          <h1 style={titleStyle}>✏️ Edit Asset</h1>
          <p style={subtitleStyle}>Loading asset information...</p>
        </div>
        <div style={formContainerStyle}>
          <p>Loading Asset Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>✏️ Edit Asset</h1>
        <p style={subtitleStyle}>Update asset information and save changes</p>
      </div>

      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Asset Name *</label>
            <input
              type="text"
              name="asset_name"
              value={asset.asset_name}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter asset name"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Asset Tag *</label>
            <input
              type="text"
              name="asset_tag"
              value={asset.asset_tag}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter asset tag"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Category *</label>
            <input
              type="text"
              name="category"
              value={asset.category}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter category"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Purchase Date *</label>
            <input
              type="date"
              name="purchase_date"
              value={asset.purchase_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Purchase Price *</label>
            <input
              type="number"
              name="purchase_price"
              value={asset.purchase_price}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter purchase price"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Current Value *</label>
            <input
              type="number"
              name="current_value"
              value={asset.current_value}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter current value"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Department ID *</label>
            <input
              type="text"
              name="department_id"
              value={asset.department_id}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter department ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Assigned To</label>
            <input
              type="text"
              name="assigned_to"
              value={asset.assigned_to}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter assigned person"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Status *</label>
            <input
              type="text"
              name="status"
              value={asset.status}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter asset status"
            />
          </div>

          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={handleCancel}
              style={secondaryButtonStyle}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={primaryButtonStyle}
              disabled={updating}
            >
              {updating ? '⏳ Updating Asset...' : '💾 Update Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAsset;