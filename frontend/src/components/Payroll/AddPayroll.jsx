import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPayroll = () => {
  const [payroll, setPayroll] = useState({
    employee_id: '',
    pay_period_start: '',
    pay_period_end: '',
    regular_hours: '',
    overtime_hours: '',
    holiday_hours: '',
    sick_hours: '',
    vacation_hours: '',
    gross_pay: '',
    federal_tax: '',
    state_tax: '',
    social_security: '',
    medicare: '',
    health_insurance: '',
    retirement_401k: '',
    other_deductions: '',
    net_pay: '',
    payment_date: '',
    payment_method: ''
  });
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPayroll({ ...payroll, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/employees');
        setEmployees(res.data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/payroll', payroll);
      navigate('/payroll');
    } catch (error) {
      console.error('Error adding payroll:', error);
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

  const secondaryButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: '2px solid #e5e7eb'
  };

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>➕ Add New Payroll</h1>
        <p style={subtitleStyle}>
          Enter payroll information to record it in your system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Employee  *</label>
            {/* <input
              type="text"
              name="employee_id"
              value={payroll.employee_id}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter employee ID"
            /> */}


<select
              name="employee_id"
              value={payroll.employee_id}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.first_name} {emp.last_name}
                </option>
              ))}
            </select>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Pay Period Start *</label>
            <input
              type="date"
              name="pay_period_start"
              value={payroll.pay_period_start}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Pay Period End *</label>
            <input
              type="date"
              name="pay_period_end"
              value={payroll.pay_period_end}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Regular Hours *</label>
            <input
              type="number"
              name="regular_hours"
              value={payroll.regular_hours}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Overtime Hours</label>
            <input
              type="number"
              name="overtime_hours"
              value={payroll.overtime_hours}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Holiday Hours</label>
            <input
              type="number"
              name="holiday_hours"
              value={payroll.holiday_hours}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Sick Hours</label>
            <input
              type="number"
              name="sick_hours"
              value={payroll.sick_hours}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Vacation Hours</label>
            <input
              type="number"
              name="vacation_hours"
              value={payroll.vacation_hours}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Gross Pay *</label>
            <input
              type="number"
              name="gross_pay"
              value={payroll.gross_pay}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Federal Tax</label>
            <input
              type="number"
              name="federal_tax"
              value={payroll.federal_tax}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>State Tax</label>
            <input
              type="number"
              name="state_tax"
              value={payroll.state_tax}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Social Security</label>
            <input
              type="number"
              name="social_security"
              value={payroll.social_security}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Medicare</label>
            <input
              type="number"
              name="medicare"
              value={payroll.medicare}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Health Insurance</label>
            <input
              type="number"
              name="health_insurance"
              value={payroll.health_insurance}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Retirement 401k</label>
            <input
              type="number"
              name="retirement_401k"
              value={payroll.retirement_401k}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Other Deductions</label>
            <input
              type="number"
              name="other_deductions"
              value={payroll.other_deductions}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Net Pay *</label>
            <input
              type="number"
              name="net_pay"
              value={payroll.net_pay}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Date *</label>
            <input
              type="date"
              name="payment_date"
              value={payroll.payment_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
  <label style={labelStyle}>Payment Method *</label>
  <select
    name="payment_method"
    value={payroll.payment_method}
    onChange={handleChange}
    style={inputStyle}
    required
  >
    <option value="direct_deposit">Direct Deposit</option>
    <option value="check">Check</option>
    <option value="cash">Cash</option>
  </select>
</div>


          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '24px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/payroll')}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ Add Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayroll;