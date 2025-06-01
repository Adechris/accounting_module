import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJournalEntry = () => {
  const [journalEntry, setJournalEntry] = useState({
    entry_number: '',
    entry_date: '',
    description: '',
    reference: '',
    details: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJournalEntry({ ...journalEntry, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (index, e) => {
    const { name, value } = e.target;
    const details = [...journalEntry.details];
    details[index][name] = value;
    setJournalEntry({ ...journalEntry, details });
  };

  const addDetail = () => {
    setJournalEntry({
      ...journalEntry,
      details: [...journalEntry.details, { account_id: '', description: '', debit_amount: '', credit_amount: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/journal-entries', journalEntry);
      navigate('/journal-entries');
    } catch (error) {
      console.error('Error adding journal entry:', error);
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
        <h1 style={titleStyle}>➕ Add Journal Entry</h1>
        <p style={subtitleStyle}>
          Enter journal entry information to record it in your books
        </p>
      </div>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          {/* Journal Entry Information Section */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Entry Number *</label>
            <input
              type="text"
              name="entry_number"
              value={journalEntry.entry_number}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter entry number"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Entry Date *</label>
            <input
              type="date"
              name="entry_date"
              value={journalEntry.entry_date}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description *</label>
            <input
              type="text"
              name="description"
              value={journalEntry.description}
              onChange={handleChange}
              style={inputStyle}
              required
              placeholder="Enter description"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Reference</label>
            <input
              type="text"
              name="reference"
              value={journalEntry.reference}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter reference"
            />
          </div>

          {/* Details Section */}
          <h4>Details</h4>
          {journalEntry.details.map((detail, index) => (
            <div key={index}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Account ID *</label>
                <input
                  type="text"
                  name="account_id"
                  value={detail.account_id}
                  onChange={(e) => handleDetailChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter account ID"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Description *</label>
                <input
                  type="text"
                  name="description"
                  value={detail.description}
                  onChange={(e) => handleDetailChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter detail description"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Debit Amount *</label>
                <input
                  type="number"
                  name="debit_amount"
                  value={detail.debit_amount}
                  onChange={(e) => handleDetailChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter debit amount"
                />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Credit Amount *</label>
                <input
                  type="number"
                  name="credit_amount"
                  value={detail.credit_amount}
                  onChange={(e) => handleDetailChange(index, e)}
                  required
                  style={inputStyle}
                  placeholder="Enter credit amount"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={addDetail} style={secondaryButtonStyle} className="mb-3">
            Add Detail
          </button>

          {/* Action Buttons */}
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              onClick={() => navigate('/journal-entries')}
              style={secondaryButtonStyle}
            >
              ❌ Cancel
            </button>
            <button 
              type="submit" 
              style={primaryButtonStyle}
            >
              ✅ Add Journal Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournalEntry;