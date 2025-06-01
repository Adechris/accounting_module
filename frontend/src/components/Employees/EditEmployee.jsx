import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    employee_id: '',
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

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/employees/${id}`);
        // Format date for input field
        const employeeData = {
          ...response.data,
          hire_date: response.data.hire_date ? response.data.hire_date.split('T')[0] : ''
        };
        setEmployee(employeeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axios.put(`http://localhost:7000/api/employees/${id}`, employee);
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
      setUpdating(false);
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
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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

  const employeeInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative',
    zIndex: 1
  };

  const avatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px'
  };

  const employeeDetailsStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const employeeNameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '4px'
  };

  const employeeIdStyle = {
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
    borderColor: '#f5576c',
    boxShadow: '0 0 0 3px rgba(245, 87, 108, 0.1)'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const readOnlyInputStyle = {
    ...inputStyle,
    backgroundColor: '#f8fafc',
    color: '#718096',
    cursor: 'not-allowed'
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
    backgroundColor: updating ? '#9ca3af' : '#f5576c',
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

  const departmentOptions = [
    'Engineering',
    'Marketing', 
    'Sales',
    'HR',
    'Finance',
    'Operations'
  ];

  const employmentTypeOptions = [
    'Full-time',
    'Part-time',
    'Contract',
    'Intern'
  ];

  const getInitials = (firstName, lastName) => {
    if (!firstName || !lastName) return '??';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerSectionStyle}>
          <div style={decorativeCircleStyle}></div>
          <div style={decorativeCircle2Style}></div>
          <h1 style={titleStyle}>✏️ Edit Employee</h1>
          <p style={subtitleStyle}>Loading employee information...</p>
        </div>
        <div style={formContainerStyle}>
          <div style={loadingContainerStyle}>
            <div style={loadingSpinnerStyle}>⏳</div>
            <h3 style={{marginBottom: '8px'}}>Loading Employee Data</h3>
            <p>Please wait while we fetch the employee information...</p>
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
        <h1 style={titleStyle}>✏️ Edit Employee</h1>
        <p style={subtitleStyle}>
          Update employee information and save changes
        </p>
        <div style={employeeInfoStyle}>
          <div style={avatarStyle}>
            {getInitials(employee.first_name, employee.last_name)}
          </div>
          <div style={employeeDetailsStyle}>
            <div style={employeeNameStyle}>
              {employee.first_name} {employee.last_name}
            </div>
            <div style={employeeIdStyle}>
              Employee ID: {employee.employee_id}
            </div>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          
          {/* Employee ID Section */}
          <div style={sectionHeaderStyle}>
            🆔 Employee Identification
          </div>
          <div style={formGridStyle}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={employee.employee_id}
                onChange={handleChange}
                style={readOnlyInputStyle}
                readOnly
                placeholder="Auto-generated"
              />
              <div style={{fontSize: '12px', color: '#718096', marginTop: '4px'}}>
                Employee ID cannot be modified
              </div>
            </div>
          </div>

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
              disabled={updating}
              onMouseEnter={(e) => !updating && (e.target.style.backgroundColor = '#e11d48')}
              onMouseLeave={(e) => !updating && (e.target.style.backgroundColor = '#f5576c')}
            >
              {updating ? '⏳ Updating Employee...' : '💾 Update Employee'}
            </button>
          </div>
        </form>
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

export default EditEmployee;