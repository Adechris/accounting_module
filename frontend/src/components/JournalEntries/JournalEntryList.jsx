import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JournalEntryList = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/journal-entries');
        setJournalEntries(response.data.journal_entries);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
        setLoading(false);
      }
    };
    fetchJournalEntries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await axios.delete(`http://localhost:7000/api/journal-entries/${id}`);
        setJournalEntries(journalEntries.filter(entry => entry.id !== id));
      } catch (error) {
        console.error('Error deleting journal entry:', error);
      }
    }
  };

  const filteredEntries = journalEntries.filter(entry => 
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div>Loading journal entries...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>📓 Journal Entries</h1>
        <p>Manage your journal entries and track your reflections</p>
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
          to="/add-journal-entry" 
          style={addButtonStyle}
        >
          ➕ Add Journal Entry
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Entry Number</th>
              <th style={thStyle}>Entry Date</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Reference</th>
              <th style={thStyle}>Total Debit</th>
              <th style={thStyle}>Total Credit</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '16px' }}>
                  No entries found
                </td>
              </tr>
            ) : (
              filteredEntries.map(entry => (
                <tr key={entry.id}>
                  <td style={tdStyle}>{entry.entry_number}</td>
                  <td style={tdStyle}>{entry.entry_date}</td>
                  <td style={tdStyle}>{entry.description}</td>
                  <td style={tdStyle}>{entry.reference}</td>
                  <td style={tdStyle}>{entry.total_debit}</td>
                  <td style={tdStyle}>{entry.total_credit}</td>
                  <td style={tdStyle}>{entry.status}</td>
                  <td style={tdStyle}>
                    <Link to={`/journal-entry/${entry.id}`} className="btn btn-info btn-sm">View</Link>
                    <button 
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
                      onClick={() => handleDelete(entry.id)}
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

export default JournalEntryList;