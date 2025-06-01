import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    department: '',
    position: '',
    salary: '',
    hourly_rate: '',
    hire_date: '',
    employment_type: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:7000/api/employees', employee);
      navigate('/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
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

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
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
    backgroundColor: loading ? '#9ca3af' : '#10b981',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '2px solid #e5e7eb'
  };

  const departmentOptions = [
    'Engineering',
    'Marketing', 
    'Sales',
    'HR',
    'Finance',
    'Operations'
  ];

  const employmentTypeOptions = [
    'full_time',
    'part_time',
    'contract',
    'intern'
  ];

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <div style={decorativeCircleStyle}></div>
        <h1 style={titleStyle}>➕ Add New Employee</h1>
        <p style={subtitleStyle}>
          Enter employee information to add them to your workforce
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          
          {/* Personal Information Section */}
          <div style={sectionHeaderStyle}>
            👤 Personal Information
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>First Name *</label>
              <input
                type="text"
                name="first_name"
                value={employee.first_name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Enter first name"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Last Name *</label>
              <input
                type="text"
                name="last_name"
                value={employee.last_name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Enter last name"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Email Address *</label>
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="employee@company.com"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Address Information Section */}
          <div style={sectionHeaderStyle}>
            🏠 Address Information
          </div>
          <div style={formGridStyle}>
            <div style={{...inputGroupStyle, gridColumn: '1 / -1'}}>
              <label style={labelStyle}>Street Address *</label>
              <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="123 Main Street"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>City *</label>
              <input
                type="text"
                name="city"
                value={employee.city}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Enter city"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>State *</label>
              <input
                type="text"
                name="state"
                value={employee.state}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Enter state"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Postal Code *</label>
              <input
                type="text"
                name="postal_code"
                value={employee.postal_code}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="12345"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Country *</label>
              <input
                type="text"
                name="country"
                value={employee.country}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="United States"
              />
            </div>
          </div>

          {/* Employment Information Section */}
          <div style={sectionHeaderStyle}>
            💼 Employment Information
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Department *</label>
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              >
                <option value="">Select Department</option>
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Position *</label>
              <input
                type="text"
                name="position"
                value={employee.position}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="Software Engineer"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Employment Type *</label>
              <select
                name="employment_type"
                value={employee.employment_type}
                onChange={handleChange}
                style={selectStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              >
                <option value="">Select Employment Type</option>
                {employmentTypeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Hire Date *</label>
              <input
                type="date"
                name="hire_date"
                value={employee.hire_date}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              />
            </div>
          </div>

          {/* Compensation Information Section */}
          <div style={sectionHeaderStyle}>
            💰 Compensation Information
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Annual Salary *</label>
              <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="50000"
                min="0"
                step="1000"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Hourly Rate *</label>
              <input
                type="number"
                name="hourly_rate"
                value={employee.hourly_rate}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="25.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div style={sectionHeaderStyle}>
            🚨 Emergency Contact
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Emergency Contact Name *</label>
              <input
                type="text"
                name="emergency_contact_name"
                value={employee.emergency_contact_name}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="John Doe"
              />
            </div>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Emergency Contact Phone *</label>
              <input
                type="tel"
                name="emergency_contact_phone"
                value={employee.emergency_contact_phone}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
                placeholder="+1 (555) 987-6543"
              />
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
              disabled={loading}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#059669')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#10b981')}
            >
              {loading ? '⏳ Adding Employee...' : '✅ Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;