import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddInvoice = () => {
  const [invoice, setInvoice] = useState({
    invoice_number: '',
    customer_id: '',
    invoice_date: '',
    due_date: '',
    tax_rate: '',
    discount_rate: '',
    terms_conditions: '',
    notes: '',
    items: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    items[index][name] = value;
    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: '', unit_price: '', discount_rate: '', account_id: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/invoices', invoice);
      navigate('/invoices');
    } catch (error) {
      console.error('Error adding invoice:', error);
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
        <h1 style={titleStyle}>➕ Add New Invoice</h1>
        <p style={subtitleStyle}>
          Enter invoice information to record it in your system
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Invoice Number *</label>
            <input
              type="text"
              name="invoice_number"
              value={invoice.invoice_number}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter invoice number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Customer ID *</label>
            <input
              type="text"
              name="customer_id"
              value={invoice.customer_id}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter customer ID"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Invoice Date *</label>
            <input
              type="date"
              name="invoice_date"
              value={invoice.invoice_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Due Date *</label>
            <input
              type="date"
              name="due_date"
              value={invoice.due_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Tax Rate</label>
            <input
              type="number"
              name="tax_rate"
              value={invoice.tax_rate}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter tax rate"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Discount Rate</label>
            <input
              type="number"
              name="discount_rate"
              value={invoice.discount_rate}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter discount rate"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Terms and Conditions</label>
            <textarea
              name="terms_conditions"
              value={invoice.terms_conditions}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
              placeholder="Enter terms and conditions"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Notes</label>
            <textarea
              name="notes"
              value={invoice.notes}
              onChange={handleChange}
              style={{ ...inputStyle, height: '100px' }}
              placeholder="Enter any notes"
            />
          </div>

          {/* Items Section */}
          <h4>Items</h4>
          {invoice.items.map((item, index) => (
            <div key={index}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Description *</label>
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter item description"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter quantity"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Unit Price *</label>
                <input
                  type="number"
                  name="unit_price"
                  value={item.unit_price}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter unit price"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Discount Rate</label>
                <input
                  type="number"
                  name="discount_rate"
                  value={item.discount_rate}
                  onChange={(e) => handleItemChange(index, e)}
                  style={inputStyle}
                  placeholder="Enter discount rate"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Account ID *</label>
                <input
                  type="text"
                  name="account_id"
                  value={item.account_id}
                  onChange={(e) => handleItemChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter account ID"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addItem} style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }} className="mb-3">
            Add Item
          </button>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '24px' }}>
            <button 
              type="button" 
              onClick={() => navigate('/invoices')}
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#f3f4f6', color: '#374151', border: '2px solid #e5e7eb' }}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={{ padding: '12px 32px', borderRadius: '12px', backgroundColor: '#10b981', color: 'white', border: 'none' }}
            >
              ✅ Add Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoice;