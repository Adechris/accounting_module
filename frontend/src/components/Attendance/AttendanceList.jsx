 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AttendanceList = () => {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/api/attendance');
//         setAttendance(response.data.attendance);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching attendance:', error);
//         setLoading(false);
//       }
//     };

//     fetchAttendance();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this attendance record?')) {
//       try {
//         await axios.delete(`http://localhost:7000/api/attendance/${id}`);
//         setAttendance(attendance.filter(record => record.id !== id));
//       } catch (error) {
//         console.error('Error deleting attendance:', error);
//       }
//     }
//   };

//   const filteredAttendance = attendance.filter(record =>
//     record.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     record.last_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const loadingStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '200px',
//     fontSize: '18px',
//     color: '#718096'
//   };

//   const containerStyle = {
//     padding: '0',
//     maxWidth: '100%',
//   };

//   const headerSectionStyle = {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     borderRadius: '20px',
//     padding: '32px',
//     marginBottom: '32px',
//     color: 'white',
//     position: 'relative',
//   };

//   const titleStyle = {
//     fontSize: '32px',
//     fontWeight: '700',
//     marginBottom: '8px',
//   };

//   const controlsStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '24px',
//   };

//   const searchInputStyle = {
//     padding: '12px 16px',
//     borderRadius: '12px',
//     border: '2px solid #e2e8f0',
//     fontSize: '14px',
//     minWidth: '300px',
//     outline: 'none',
//   };

//   const addButtonStyle = {
//     backgroundColor: '#10b981',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     padding: '12px 24px',
//     fontSize: '14px',
//     fontWeight: '600',
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     cursor: 'pointer',
//   };

//   const tableContainerStyle = {
//     backgroundColor: 'white',
//     borderRadius: '20px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     fontSize: '14px',
//   };

//   const thStyle = {
//     padding: '16px 20px',
//     textAlign: 'left',
//     fontWeight: '600',
//     color: '#2d3748',
//     fontSize: '14px',
//     borderBottom: '2px solid #e2e8f0',
//   };

//   const tdStyle = {
//     padding: '16px 20px',
//     borderBottom: '1px solid #f1f5f9',
//     color: '#4a5568',
//   };

//   if (loading) {
//     return (
//       <div style={loadingStyle}>
//         <div>Loading attendance records...</div>
//       </div>
//     );
//   }

//   return (
//     <div style={containerStyle}>
//       {/* Header Section */}
//       <div style={headerSectionStyle}>
//         <h1 style={titleStyle}>📅 Attendance List</h1>
//         <p>Manage your attendance records and track employee hours</p>
//       </div>

//       {/* Controls Section */}
//       <div style={controlsStyle}>
//         <input
//           type="text"
//           placeholder="🔍 Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={searchInputStyle}
//         />
//         <Link to="/add-attendance" style={addButtonStyle}>
//           ➕ Add Attendance
//         </Link>
//       </div>

//       {/* Table Section */}
//       <div style={tableContainerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Employee ID</th>
//               <th style={thStyle}>First Name</th>
//               <th style={thStyle}>Last Name</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Check In Time</th>
//               <th style={thStyle}>Check Out Time</th>
//               <th style={thStyle}>Total Hours</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredAttendance.length === 0 ? (
//               <tr>
//                 <td colSpan="9" style={{ textAlign: 'center', padding: '16px' }}>
//                   No attendance records found
//                 </td>
//               </tr>
//             ) : (
//               filteredAttendance.map(record => (
//                 <tr key={record.id}>
//                   <td style={tdStyle}>{record.emp_code}</td>
//                   <td style={tdStyle}>{record.first_name}</td>
//                   <td style={tdStyle}>{record.last_name}</td>
//                   <td style={tdStyle}>{record.date}</td>
//                   <td style={tdStyle}>{record.check_in_time}</td>
//                   <td style={tdStyle}>{record.check_out_time}</td>
//                   <td style={tdStyle}>{record.total_hours}</td>
//                   <td style={tdStyle}>{record.status}</td>
//                   <td style={tdStyle}>
//                     <Link to={`/edit-attendance/${record.id}`} className="btn btn-warning btn-sm">Edit</Link>
//                     <button 
//                       style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '6px 12px', cursor: 'pointer' }}
//                       onClick={() => handleDelete(record.id)}
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AttendanceList = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // Fixed: Changed port from 000 to 7000
        const response = await axios.get('http://localhost:7000/api/attendance');
        setAttendance(response.data.attendance);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      try {
        await axios.delete(`http://localhost:7000/api/attendance/${id}`);
        setAttendance(attendance.filter(record => record.id !== id));
      } catch (error) {
        console.error('Error deleting attendance:', error);
      }
    }
  };

  const filteredAttendance = attendance.filter(record =>
    record.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.last_name.toLowerCase().includes(searchTerm.toLowerCase())
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
    textDecoration: 'none',
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

  const editButtonStyle = {
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginRight: '8px',
    fontSize: '12px',
  };

  const deleteButtonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div>Loading attendance records...</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>📅 Attendance List</h1>
        <p>Manage your attendance records and track employee hours</p>
      </div>

      {/* Controls Section */}
      <div style={controlsStyle}>
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <Link to="/add-attendance" style={addButtonStyle}>
          ➕ Add Attendance
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Employee ID</th>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Check In Time</th>
              <th style={thStyle}>Check Out Time</th>
              <th style={thStyle}>Total Hours</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '16px' }}>
                  No attendance records found
                </td>
              </tr>
            ) : (
              filteredAttendance.map(record => (
                <tr key={record.id}>
                  <td style={tdStyle}>{record.emp_code}</td>
                  <td style={tdStyle}>{record.first_name}</td>
                  <td style={tdStyle}>{record.last_name}</td>
                  <td style={tdStyle}>{record.date}</td>
                  <td style={tdStyle}>{record.check_in_time}</td>
                  <td style={tdStyle}>{record.check_out_time}</td>
                  <td style={tdStyle}>{record.total_hours}</td>
                  <td style={tdStyle}>{record.status}</td>
                  <td style={tdStyle}>
                    <Link to={`/edit-attendance/${record.id}`} style={editButtonStyle}>
                      ✏️ Edit
                    </Link>
                    <button 
                      style={deleteButtonStyle}
                      onClick={() => handleDelete(record.id)}
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

export default AttendanceList;