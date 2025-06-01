import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/payments');
        setPayments(response.data.payments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`http://localhost:7000/api/payments/${id}`);
        setPayments(payments.filter(payment => payment.id !== id));
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const filteredPayments = payments.filter(payment => 
    payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#718096'
  };

  const containerStyle = {
    padding: '0',
    maxWidth: '100%',
  };

  const headerSectionStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    color: 'white',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  };

  const searchInputStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    minWidth: '300px',
    outline: 'none',
  };

  const addButtonStyle = {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '14px',
    borderBottom: '2px solid #e2e8f0',
  };

  const tdStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #f1f5f9',
    color: '#4a5568',
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div>Loading payments...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>💰 Payment List</h1>
        <p>Manage your payments and track transactions</p>
      </div>

      {/* Controls Section */}
      <div style={controlsStyle}>
        <input
          type="text"
          placeholder="🔍 Search by customer or supplier name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <Link 
          to="/add-payment" 
          style={addButtonStyle}
        >
          ➕ Add Payment
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Payment Number</th>
              <th style={thStyle}>Payment Type</th>
              <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Supplier Name</th>
              <th style={thStyle}>Payment Date</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '16px' }}>
                  No payments found
                </td>
              </tr>
            ) : (
              filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td style={tdStyle}>{payment.payment_number}</td>
                  <td style={tdStyle}>{payment.payment_type}</td>
                  <td style={tdStyle}>{payment.customer_name}</td>
                  <td style={tdStyle}>{payment.supplier_name}</td>
                  <td style={tdStyle}>{payment.payment_date}</td>
                  <td style={tdStyle}>{payment.amount}</td>
                  <td style={tdStyle}>
                    <button 
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                      onClick={() => handleDelete(payment.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;