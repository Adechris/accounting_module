import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    department_name: '',
    department_code: '',
    manager_id: '',
    status: 'active' // Default status
  });

  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users'); // Adjust the endpoint as needed
        setManagers(response.data.users); // Ensure this matches your API response structure
      } catch (error) {
        console.error('Error fetching managers:', error);
      }
    };
    fetchManagers();
  }, []);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/departments', department);
      navigate('/departments');
    } catch (error) {
      console.error('Error adding department:', error);
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

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const buttonGroupStyle = {
    display: 'flex',
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

  const cancelButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '2px solid #e5e7eb'
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>➕ Add New Department</h1>
        <p style={subtitleStyle}>
          Enter department information to add it to your records
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Department Name *</label>
            <input
              type="text"
              name="department_name"
              value={department.department_name}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter department name"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Department Code *</label>
            <input
              type="text"
              name="department_code"
              value={department.department_code}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter department code"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Manager *</label>
            <select
              name="manager_id"
              value={department.manager_id}
              onChange={handleChange}
              style={selectStyle}
              required
            >
              <option value="">Select Manager</option>
              {managers.map(manager => (
                <option key={manager.id} value={manager.id}>
                  {`${manager.first_name} ${manager.last_name}`} {/* Adjust based on your manager object structure */}
                </option>
              ))}
            </select>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Status *</label>
            <select
              name="status"
              value={department.status}
              onChange={handleChange}
              style={selectStyle}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={() => navigate('/departments')}
              style={cancelButtonStyle}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={primaryButtonStyle}
            >
              ✅ Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;