import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/expenses');
        setExpenses(response.data.expenses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:7000/api/expenses/${id}`);
        setExpenses(expenses.filter(expense => expense.id !== id));
      } catch (error) {
        console.error('Error deleting expense:', error);
      }
    }
  };

  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div>Loading expenses...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>💸 Expense List</h1>
        <p>Manage your expenses and track spending</p>
      </div>

      {/* Controls Section */}
      <div style={controlsStyle}>
        <input
          type="text"
          placeholder="🔍 Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <Link 
          to="/add-expense" 
          style={addButtonStyle}
        >
          ➕ Add Expense
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Expense Number</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Subcategory</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Expense Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '16px' }}>
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td style={tdStyle}>{expense.expense_number}</td>
                  <td style={tdStyle}>{expense.category}</td>
                  <td style={tdStyle}>{expense.subcategory}</td>
                  <td style={tdStyle}>{expense.description}</td>
                  <td style={tdStyle}>{expense.amount}</td>
                  <td style={tdStyle}>{expense.expense_date}</td>
                  <td style={tdStyle}>{expense.status}</td>
                  <td style={tdStyle}>
                    <Link to={`/approve-expense/${expense.id}`} className="btn btn-warning btn-sm">Approve</Link>
                    <button 
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                      onClick={() => handleDelete(expense.id)}
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

export default ExpenseList;