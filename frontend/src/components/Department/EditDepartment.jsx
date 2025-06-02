import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState({
    department_name: '',
    department_code: '',
    manager_id: '',
    status: ''
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/departments/${id}`);
        setDepartment(response.data.department);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching department:', error);
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:3000/api/departments/${id}`, department);
      navigate('/departments');
    } catch (error) {
      console.error('Error updating department:', error);
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    navigate('/departments');
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
          <h1 style={titleStyle}>✏️ Edit Department</h1>
          <p style={subtitleStyle}>Loading department information...</p>
        </div>
        <div style={formContainerStyle}>
          <p>Loading Department Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>✏️ Edit Department</h1>
        <p style={subtitleStyle}>Update department information and save changes</p>
      </div>

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
            <label style={labelStyle}>Manager ID *</label>
            <input
              type="text"
              name="manager_id"
              value={department.manager_id}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter manager ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Status *</label>
            <input
              type="text"
              name="status"
              value={department.status}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter status"
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
              {updating ? '⏳ Updating Department...' : '💾 Update Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;