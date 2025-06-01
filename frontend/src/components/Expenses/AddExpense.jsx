import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const [expense, setExpense] = useState({
    expense_number: '',
    category: '',
    subcategory: '',
    description: '',
    amount: '',
    expense_date: '',
    payment_method: '',
    receipt_number: '',
    employee_id: '',
    account_id: '',
    supplier_id: '',
    project_id: '',
    is_reimbursable: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/expenses', expense);
      navigate('/expenses');
    } catch (error) {
      console.error('Error adding expense:', error);
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
        <h1 style={titleStyle}>➕ Add New Expense</h1>
        <p style={subtitleStyle}>
          Enter expense information to record it in your system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Expense Number *</label>
            <input
              type="text"
              name="expense_number"
              value={expense.expense_number}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter expense number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Category *</label>
            <input
              type="text"
              name="category"
              value={expense.category}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter category"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={expense.subcategory}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter subcategory"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description *</label>
            <input
              type="text"
              name="description"
              value={expense.description}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter description"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Amount *</label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter amount"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Expense Date *</label>
            <input
              type="date"
              name="expense_date"
              value={expense.expense_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Method *</label>
            <input
              type="text"
              name="payment_method"
              value={expense.payment_method}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter payment method"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Receipt Number</label>
            <input
              type="text"
              name="receipt_number"
              value={expense.receipt_number}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter receipt number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Employee ID</label>
            <input
              type="text"
              name="employee_id"
              value={expense.employee_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter employee ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Account ID *</label>
            <input
              type="text"
              name="account_id"
              value={expense.account_id}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter account ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Supplier ID</label>
            <input
              type="text"
              name="supplier_id"
              value={expense.supplier_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter supplier ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Project ID</label>
            <input
              type="text"
              name="project_id"
              value={expense.project_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter project ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Is Reimbursable</label>
            <input
              type="checkbox"
              name="is_reimbursable"
              checked={expense.is_reimbursable}
              onChange={(e) => setExpense({ ...expense, is_reimbursable: e.target.checked })}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '24px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/expenses')}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;