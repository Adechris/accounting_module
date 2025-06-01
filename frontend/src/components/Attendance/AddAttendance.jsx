import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAttendance = () => {
  const [attendance, setAttendance] = useState({
    employee_id: '',
    date: '',
    check_in_time: '',
    check_out_time: '',
    break_duration: '',
    total_hours: '',
    overtime_hours: '',
    status: '',
    notes: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/attendance', attendance);
      navigate('/attendance');
    } catch (error) {
      console.error('Error adding attendance:', error);
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

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>➕ Add Attendance</h1>
        <p style={subtitleStyle}>
          Enter attendance information to record it in your system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Employee ID *</label>
            <input
              type="text"
              name="employee_id"
              value={attendance.employee_id}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter employee ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Date *</label>
            <input
              type="date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Check In Time *</label>
            <input
              type="time"
              name="check_in_time"
              value={attendance.check_in_time}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Check Out Time *</label>
            <input
              type="time"
              name="check_out_time"
              value={attendance.check_out_time}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Break Duration *</label>
            <input
              type="text"
              name="break_duration"
              value={attendance.break_duration}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter break duration"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Total Hours *</label>
            <input
              type="text"
              name="total_hours"
              value={attendance.total_hours}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter total hours"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Overtime Hours *</label>
            <input
              type="text"
              name="overtime_hours"
              value={attendance.overtime_hours}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter overtime hours"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Status *</label>
            <input
              type="text"
              name="status"
              value={attendance.status}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter status"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Notes</label>
            <textarea
              name="notes"
              value={attendance.notes}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
              placeholder="Enter any notes"
            />
          </div>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={() => navigate('/attendance')}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ Add Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttendance;