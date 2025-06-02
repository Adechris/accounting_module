import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAsset = () => {
  const [asset, setAsset] = useState({
    asset_name: '',
    asset_tag: '',
    category: '',
    purchase_date: '',
    purchase_price: '',
    current_value: '',
    department_id: '',
    assigned_to: '',
    status: 'Active'
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  // Fetch departments and employees for dropdowns
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [deptResponse, empResponse] = await Promise.all([
          axios.get('http://localhost:7000/api/departments'),
          axios.get('http://localhost:7000/api/employees')
        ]);
        setDepartments(deptResponse.data.departments || []);
        setEmployees(empResponse.data.employees || []);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchDropdownData();
  }, []);

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/assets', asset);
      navigate('/assets');
    } catch (error) {
      console.error('Error adding asset:', error);
    }
  };

  // Generate asset tag automatically
  const generateAssetTag = () => {
    const prefix = asset.category ? asset.category.substring(0, 3).toUpperCase() : 'AST';
    const timestamp = Date.now().toString().slice(-6);
    const tag = `${prefix}-${timestamp}`;
    setAsset({ ...asset, asset_tag: tag });
  };

  // Styles
  const containerStyle = {
    padding: 0,
    maxWidth: '100%',
    minHeight: '100vh',
    backgroundColor: '#f8fafc'
  };

  const headerSectionStyle = {
    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
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

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
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

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
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
    gap: '8px',
    margin: '0 8px'
  };

  const generateButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '8px 16px',
    fontSize: '12px'
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>🏗️ Add New Asset</h1>
        <p style={subtitleStyle}>
          Register a new asset in your inventory management system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div style={rowStyle}>
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
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  name="asset_tag"
                  value={asset.asset_tag}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 1 }}
                  required
                  placeholder="Enter or generate asset tag"
                />
                <button
                  type="button"
                  onClick={generateAssetTag}
                  style={generateButtonStyle}
                >
                  🎲 Generate
                </button>
              </div>
            </div>
          </div>

          <div style={rowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Category *</label>
              <select
                name="category"
                value={asset.category}
                onChange={handleChange}
                style={selectStyle}
                required
              >
                <option value="">Select category</option>
                <option value="Computer Equipment">Computer Equipment</option>
                <option value="Office Furniture">Office Furniture</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Machinery">Machinery</option>
                <option value="Software">Software</option>
                <option value="Electronics">Electronics</option>
                <option value="Tools">Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Status *</label>
              <select
                name="status"
                value={asset.status}
                onChange={handleChange}
                style={selectStyle}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Disposed">Disposed</option>
              </select>
            </div>
          </div>

          {/* Financial Information */}
          <div style={rowStyle}>
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
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Current Value</label>
            <input
              type="number"
              name="current_value"
              value={asset.current_value}
              onChange={handleChange}
              style={inputStyle}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          {/* Assignment Information */}
          <div style={rowStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Department</label>
              <select
                name="department_id"
                value={asset.department_id}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.department_name}
                  </option>
                ))}
              </select>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Assigned To</label>
              <select
                name="assigned_to"
                value={asset.assigned_to}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="">Select employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <button 
              type="button" 
              onClick={() => navigate('/assets')}
              style={{ 
                ...buttonBaseStyle,
                backgroundColor: '#f3f4f6', 
                color: '#374151', 
                border: '2px solid #e5e7eb' 
              }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ 
                ...buttonBaseStyle,
                backgroundColor: '#10b981', 
                color: 'white', 
                border: 'none' 
              }}
            >
              ✅ Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;