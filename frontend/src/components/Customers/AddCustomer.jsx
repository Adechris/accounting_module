import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    customer_code: '',
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    credit_limit: '',
    payment_terms: '',
    tax_id: '',
    website: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/customers', customer);
      navigate('/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
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
        <h1 style={titleStyle}>➕ Add New Customer</h1>
        <p style={subtitleStyle}>
          Enter customer information to add them to your records
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Customer Code *</label>
            <input
              type="text"
              name="customer_code"
              value={customer.customer_code}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter customer code"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Company Name *</label>
            <input
              type="text"
              name="company_name"
              value={customer.company_name}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter company name"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contact Person *</label>
            <input
              type="text"
              name="contact_person"
              value={customer.contact_person}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter contact person name"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter email"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Phone *</label>
            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter phone number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={customer.mobile}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter mobile number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Address *</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter address"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>City *</label>
            <input
              type="text"
              name="city"
              value={customer.city}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter city"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>State *</label>
            <input
              type="text"
              name="state"
              value={customer.state}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter state"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Postal Code *</label>
            <input
              type="text"
              name="postal_code"
              value={customer.postal_code}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter postal code"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Country *</label>
            <input
              type="text"
              name="country"
              value={customer.country}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter country"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Credit Limit</label>
            <input
              type="number"
              name="credit_limit"
              value={customer.credit_limit}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter credit limit"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Payment Terms</label>
            <input
              type="text"
              name="payment_terms"
              value={customer.payment_terms}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter payment terms"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Tax ID</label>
            <input
              type="text"
              name="tax_id"
              value={customer.tax_id}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter tax ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Website</label>
            <input
              type="text"
              name="website"
              value={customer.website}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter website"
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '24px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/customers')}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;