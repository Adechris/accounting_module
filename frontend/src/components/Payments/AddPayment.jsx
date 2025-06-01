import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPayment = () => {
  const [payment, setPayment] = useState({
    payment_number: '',
    payment_type: '',
    customer_id: '',
    supplier_id: '',
    invoice_id: '',
    bill_id: '',
    payment_date: '',
    amount: '',
    payment_method: '',
    bank_account_id: '',
    check_number: '',
    reference: '',
    memo: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/payments', payment);
      navigate('/payments');
    } catch (error) {
      console.error('Error adding payment:', error);
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
        <h1 style={titleStyle}>➕ Add New Payment</h1>
        <p style={subtitleStyle}>
          Enter payment information to record it in your system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Number *</label>
            <input
              type="text"
              name="payment_number"
              value={payment.payment_number}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter payment number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Type *</label>
            <select
              name="payment_type"
              value={payment.payment_type}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Payment Type</option>
              <option value="received">Received</option>
              <option value="made">Made</option>
            </select>
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Customer ID</label>
            <input
              type="text"
              name="customer_id"
              value={payment.customer_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter customer ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Supplier ID</label>
            <input
              type="text"
              name="supplier_id"
              value={payment.supplier_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter supplier ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Invoice ID</label>
            <input
              type="text"
              name="invoice_id"
              value={payment.invoice_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter invoice ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Bill ID</label>
            <input
              type="text"
              name="bill_id"
              value={payment.bill_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter bill ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Date *</label>
            <input
              type="date"
              name="payment_date"
              value={payment.payment_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Amount *</label>
            <input
              type="number"
              name="amount"
              value={payment.amount}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter amount"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Method *</label>
            <input
              type="text"
              name="payment_method"
              value={payment.payment_method}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter payment method"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Bank Account ID</label>
            <input
              type="text"
              name="bank_account_id"
              value={payment.bank_account_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter bank account ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Check Number</label>
            <input
              type="text"
              name="check_number"
              value={payment.check_number}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter check number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Reference</label>
            <input
              type="text"
              name="reference"
              value={payment.reference}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter reference"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Memo</label>
            <textarea
              name="memo"
              value={payment.memo}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
              placeholder="Enter any memo"
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '24px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/payments')}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ Add Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;