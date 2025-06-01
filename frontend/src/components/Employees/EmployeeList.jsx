// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterDepartment, setFilterDepartment] = useState('All');
//   const [sortBy, setSortBy] = useState('name');

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:7000/api/employees');
//         console.log('Employees:', response.data);
//         setEmployees(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching employees:', error);
//         setLoading(false);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this employee?')) {
//       try {
//         await axios.delete(`http://localhost:7000/api/employees/${id}`);
//         setEmployees(employees.filter(employee => employee.id !== id));
//       } catch (error) {
//         console.error('Error deleting employee:', error);
//       }
//     }
//   };

//   // Filter, search and sort logic
//   const filteredEmployees = employees
//     .filter(employee => {
//       const matchesSearch = 
//         employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesDepartment = filterDepartment === 'All' || employee.department === filterDepartment;
      
//       return matchesSearch && matchesDepartment;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'name':
//           return a.first_name.localeCompare(b.first_name);
//         case 'department':
//           return a.department.localeCompare(b.department);
//         case 'employee_id':
//           return a.employee_id.localeCompare(b.employee_id);
//         default:
//           return 0;
//       }
//     });

//   const departments = [...new Set(employees.map(employee => employee.department))];

//   // Styles
//   const containerStyle = {
//     padding: 0,
//     maxWidth: '100%'
//   };

//   const headerSectionStyle = {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     borderRadius: '20px',
//     padding: '32px',
//     marginBottom: '32px',
//     color: 'white',
//     position: 'relative',
//     overflow: 'hidden'
//   };

//   const decorativeCircleStyle = {
//     position: 'absolute',
//     top: '-50px',
//     right: '-50px',
//     width: '150px',
//     height: '150px',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: '50%'
//   };

//   const titleStyle = {
//     fontSize: '32px',
//     fontWeight: '700',
//     marginBottom: '8px',
//     position: 'relative',
//     zIndex: 1
//   };

//   const subtitleStyle = {
//     fontSize: '16px',
//     opacity: '0.9',
//     marginBottom: '24px',
//     position: 'relative',
//     zIndex: 1
//   };

//   const statsStyle = {
//     display: 'flex',
//     gap: '32px',
//     position: 'relative',
//     zIndex: 1
//   };

//   const statItemStyle = {
//     textAlign: 'center'
//   };

//   const statValueStyle = {
//     fontSize: '24px',
//     fontWeight: '700'
//   };

//   const statLabelStyle = {
//     fontSize: '14px',
//     opacity: '0.8'
//   };

//   const controlsStyle = {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '24px',
//     gap: '16px',
//     flexWrap: 'wrap'
//   };

//   const searchFilterGroupStyle = {
//     display: 'flex',
//     gap: '16px',
//     alignItems: 'center',
//     flex: 1
//   };

//   const searchInputStyle = {
//     padding: '12px 16px',
//     borderRadius: '12px',
//     border: '2px solid #e2e8f0',
//     fontSize: '14px',
//     minWidth: '300px',
//     transition: 'all 0.3s ease',
//     outline: 'none'
//   };

//   const selectStyle = {
//     padding: '12px 16px',
//     borderRadius: '12px',
//     border: '2px solid #e2e8f0',
//     fontSize: '14px',
//     backgroundColor: 'white',
//     minWidth: '150px',
//     outline: 'none'
//   };

//   const addButtonStyle = {
//     backgroundColor: '#10b981',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     padding: '12px 24px',
//     fontSize: '14px',
//     fontWeight: '600',
//     textDecoration: 'none',
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     transition: 'all 0.3s ease',
//     cursor: 'pointer'
//   };

//   const tableContainerStyle = {
//     backgroundColor: 'white',
//     borderRadius: '20px',
//     overflow: 'hidden',
//     boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
//     border: '1px solid #e2e8f0'
//   };

//   const tableStyle = {
//     width: '100%',
//     borderCollapse: 'collapse',
//     fontSize: '14px'
//   };

//   const tableHeaderStyle = {
//     backgroundColor: '#f8fafc',
//     borderBottom: '2px solid #e2e8f0'
//   };

//   const thStyle = {
//     padding: '16px 20px',
//     textAlign: 'left',
//     fontWeight: '600',
//     color: '#2d3748',
//     fontSize: '14px',
//     borderRight: '1px solid #e2e8f0'
//   };

//   const tdStyle = {
//     padding: '16px 20px',
//     borderBottom: '1px solid #f1f5f9',
//     borderRight: '1px solid #f1f5f9',
//     color: '#4a5568'
//   };

//   const employeeRowStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px'
//   };

//   const avatarStyle = {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     backgroundColor: '#e2e8f0',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: '600',
//     color: '#4a5568',
//     fontSize: '16px'
//   };

//   const employeeInfoStyle = {
//     display: 'flex',
//     flexDirection: 'column'
//   };

//   const employeeNameStyle = {
//     fontWeight: '600',
//     color: '#2d3748',
//     marginBottom: '2px'
//   };

//   const employeeIdStyle = {
//     fontSize: '12px',
//     color: '#718096'
//   };

//   const actionButtonStyle = {
//     padding: '6px 12px',
//     borderRadius: '6px',
//     border: 'none',
//     fontSize: '12px',
//     fontWeight: '500',
//     cursor: 'pointer',
//     textDecoration: 'none',
//     display: 'inline-block',
//     marginRight: '8px',
//     transition: 'all 0.2s ease'
//   };

//   const editButtonStyle = {
//     ...actionButtonStyle,
//     backgroundColor: '#fbbf24',
//     color: 'white'
//   };

//   const deleteButtonStyle = {
//     ...actionButtonStyle,
//     backgroundColor: '#ef4444',
//     color: 'white'
//   };

//   const loadingStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '200px',
//     fontSize: '18px',
//     color: '#718096'
//   };

//   const emptyStateStyle = {
//     textAlign: 'center',
//     padding: '48px 24px',
//     color: '#718096'
//   };

//   const badgeStyle = {
//     padding: '4px 12px',
//     borderRadius: '12px',
//     fontSize: '12px',
//     fontWeight: '500',
//     display: 'inline-block'
//   };

//   const getDepartmentColor = (department) => {
//     const colors = {
//       'Engineering': { bg: '#dbeafe', color: '#1e40af' },
//       'Marketing': { bg: '#fecaca', color: '#dc2626' },
//       'Sales': { bg: '#d1fae5', color: '#059669' },
//       'HR': { bg: '#fef3c7', color: '#d97706' },
//       'Finance': { bg: '#e0e7ff', color: '#5b21b6' },
//       'Operations': { bg: '#fed7d7', color: '#c53030' }
//     };
//     return colors[department] || { bg: '#f3f4f6', color: '#374151' };
//   };

//   const getInitials = (firstName, lastName) => {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//   };

//   if (loading) {
//     return (
//       <div style={loadingStyle}>
//         <div>
//           <div style={{ marginBottom: '16px', fontSize: '24px' }}>⏳</div>
//           Loading employees...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={containerStyle}>
//       {/* Header Section */}
//       <div style={headerSectionStyle}>
//         <div style={decorativeCircleStyle}></div>
//         <h1 style={titleStyle}>👥 Employee Management</h1>
//         <p style={subtitleStyle}>
//           Manage your workforce and track employee information
//         </p>
//         <div style={statsStyle}>
//           <div style={statItemStyle}>
//             <div style={statValueStyle}>{employees.length}</div>
//             <div style={statLabelStyle}>Total Employees</div>
//           </div>
//           <div style={statItemStyle}>
//             <div style={statValueStyle}>{departments.length}</div>
//             <div style={statLabelStyle}>Departments</div>
//           </div>
//           <div style={statItemStyle}>
//             <div style={statValueStyle}>{filteredEmployees.length}</div>
//             <div style={statLabelStyle}>Showing</div>
//           </div>
//         </div>
//       </div>

//       {/* Controls Section */}
//       <div style={controlsStyle}>
//         <div style={searchFilterGroupStyle}>
//           <input
//             type="text"
//             placeholder="🔍 Search by name, email or employee ID..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={searchInputStyle}
//           />
//           <select
//             value={filterDepartment}
//             onChange={(e) => setFilterDepartment(e.target.value)}
//             style={selectStyle}
//           >
//             <option value="All">All Departments</option>
//             {departments.map(dept => (
//               <option key={dept} value={dept}>{dept}</option>
//             ))}
//           </select>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             style={selectStyle}
//           >
//             <option value="name">Sort by Name</option>
//             <option value="department">Sort by Department</option>
//             <option value="employee_id">Sort by ID</option>
//           </select>
//         </div>
//         <Link 
//           to="/add-employee" 
//           style={addButtonStyle}
//           onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
//           onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
//         >
//           ➕ Add New Employee
//         </Link>
//       </div>

//       {/* Table Section */}
//       <div style={tableContainerStyle}>
//         {filteredEmployees.length === 0 ? (
//           <div style={emptyStateStyle}>
//             <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
//             <h3 style={{ color: '#4a5568', marginBottom: '8px' }}>No employees found</h3>
//             <p>Try adjusting your search or filter criteria</p>
//           </div>
//         ) : (
//           <table style={tableStyle}>
//             <thead style={tableHeaderStyle}>
//               <tr>
//                 <th style={thStyle}>#</th>
//                 <th style={thStyle}>Employee</th>
//                 <th style={thStyle}>Employee ID</th>
//                 <th style={thStyle}>Email</th>
//                 <th style={thStyle}>Department</th>
//                 <th style={thStyle}>Position</th>
//                 <th style={{ ...thStyle, borderRight: 'none' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEmployees.map((employee, index) => (
//                 <tr 
//                   key={employee.id}
//                   style={{
//                     backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbfc'
//                   }}
//                 >
//                   <td style={{ ...tdStyle, fontWeight: '600', color: '#2d3748' }}>
//                     {index + 1}
//                   </td>
//                   <td style={tdStyle}>
//                     <div style={employeeRowStyle}>
//                       <div style={avatarStyle}>
//                         {getInitials(employee.first_name, employee.last_name)}
//                       </div>
//                       <div style={employeeInfoStyle}>
//                         <div style={employeeNameStyle}>
//                           {employee.first_name} {employee.last_name}
//                         </div>
//                         <div style={employeeIdStyle}>
//                           ID: {employee.employee_id}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td style={{ ...tdStyle, fontWeight: '600', color: '#2d3748' }}>
//                     {employee.employee_id}
//                   </td>
//                   <td style={tdStyle}>
//                     <a 
//                       href={`mailto:${employee.email}`}
//                       style={{ color: '#4299e1', textDecoration: 'none' }}
//                     >
//                       {employee.email}
//                     </a>
//                   </td>
//                   <td style={tdStyle}>
//                     <span 
//                       style={{
//                         ...badgeStyle,
//                         backgroundColor: getDepartmentColor(employee.department).bg,
//                         color: getDepartmentColor(employee.department).color
//                       }}
//                     >
//                       {employee.department}
//                     </span>
//                   </td>
//                   <td style={tdStyle}>{employee.position}</td>
//                   <td style={{ ...tdStyle, borderRight: 'none' }}>
//                     <Link 
//                       to={`/edit-employee/${employee.id}`}
//                       style={editButtonStyle}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = '#fbbf24'}
//                     >
//                       ✏️ Edit
//                     </Link>
//                     <button 
//                       style={deleteButtonStyle}
//                       onClick={() => handleDelete(employee.id)}
//                       onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
//                       onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Summary */}
//       {filteredEmployees.length > 0 && (
//         <div style={{
//           marginTop: '24px',
//           padding: '16px',
//           backgroundColor: 'white',
//           borderRadius: '12px',
//           border: '1px solid #e2e8f0',
//           textAlign: 'center',
//           color: '#718096'
//         }}>
//           Showing {filteredEmployees.length} of {employees.length} employees
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Set up axios defaults with auth token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust based on where you store your token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/employees');
        console.log('Employees:', response.data);
        setEmployees(response.data);
        
        await fetchTodaysAttendance(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const fetchTodaysAttendance = async (employeeList) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      console.log('Fetching attendance for date:', today);
      
      const response = await axios.get(`http://localhost:7000/api/attendance/today/${today}`);
      console.log('Attendance response:', response.data);
      
      const statusMap = {};
      if (response.data && Array.isArray(response.data)) {
        response.data.forEach(record => {
          statusMap[record.employee_id] = {
            isCheckedIn: record.check_in_time && !record.check_out_time,
            checkInTime: record.check_in_time,
            checkOutTime: record.check_out_time,
            attendanceId: record.id
          };
        });
      }
      
      employeeList.forEach(emp => {
        if (!statusMap[emp.id]) {
          statusMap[emp.id] = {
            isCheckedIn: false,
            checkInTime: null,
            checkOutTime: null,
            attendanceId: null
          };
        }
      });
      
      console.log('Final attendance status map:', statusMap);
      setAttendanceStatus(statusMap);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      console.error('Error details:', error.response?.data);
      
      const statusMap = {};
      employeeList.forEach(emp => {
        statusMap[emp.id] = {
          isCheckedIn: false,
          checkInTime: null,
          checkOutTime: null,
          attendanceId: null
        };
      });
      setAttendanceStatus(statusMap);
    }
  };

  const handleCheckInOut = async (employee) => {
    const currentStatus = attendanceStatus[employee.id];
    const action = currentStatus.isCheckedIn ? 'out' : 'in';
    
    try {
      console.log('Attempting check-in/out:', {
        employee_id: employee.id,
        action: action,
        employee_name: `${employee.first_name} ${employee.last_name}`,
        url: 'http://localhost:7000/api/attendance/clock-in-out'
      });

      // Get token for this specific request
      const token = localStorage.getItem('token'); // Adjust based on where you store your token
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };

      const response = await axios.post(
        'http://localhost:7000/api/attendance/clock-in-out',
        {
          employee_id: employee.id,
          action: action
        },
        config
      );

      console.log('Check-in/out response:', response.data);

      const updatedStatus = { ...attendanceStatus };
      
      if (action === 'in') {
        updatedStatus[employee.id] = {
          isCheckedIn: true,
          checkInTime: response.data.time,
          checkOutTime: null,
          attendanceId: response.data.attendanceId
        };
        alert(`${employee.first_name} ${employee.last_name} has been checked in successfully at ${response.data.time}`);
      } else {
        updatedStatus[employee.id] = {
          ...updatedStatus[employee.id],
          isCheckedIn: false,
          checkOutTime: response.data.time
        };
        alert(`${employee.first_name} ${employee.last_name} has been checked out successfully at ${response.data.time}. Total hours: ${response.data.totalHours?.toFixed(2) || 0}`);
      }
      
      setAttendanceStatus(updatedStatus);
      
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      // More detailed error handling
      if (error.response?.status === 404) {
        alert('Error: The attendance endpoint was not found. Please check your server routes.');
      } else if (error.response?.status === 401) {
        alert('Error: Authentication required. Please log in again.');
      } else if (error.response?.status === 403) {
        alert('Error: You do not have permission to perform this action.');
      } else {
        alert(`Error: ${error.response?.data?.message || error.message || 'Failed to process check-in/out'}`);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:7000/api/employees/${id}`);
        setEmployees(employees.filter(employee => employee.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  // Filter, search and sort logic
  const filteredEmployees = employees
    .filter(employee => {
      const matchesSearch = 
        employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment === 'All' || employee.department === filterDepartment;
      
      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.first_name.localeCompare(b.first_name);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'employee_id':
          return a.employee_id.localeCompare(b.employee_id);
        default:
          return 0;
      }
    });

  const departments = [...new Set(employees.map(employee => employee.department))];

  // Styles (keeping your existing styles)
  const containerStyle = {
    padding: 0,
    maxWidth: '100%'
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

  const decorativeCircleStyle = {
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%'
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
    marginBottom: '24px',
    position: 'relative',
    zIndex: 1
  };

  const statsStyle = {
    display: 'flex',
    gap: '32px',
    position: 'relative',
    zIndex: 1
  };

  const statItemStyle = {
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '24px',
    fontWeight: '700'
  };

  const statLabelStyle = {
    fontSize: '14px',
    opacity: '0.8'
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap'
  };

  const searchFilterGroupStyle = {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flex: 1
  };

  const searchInputStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    minWidth: '300px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const selectStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '14px',
    backgroundColor: 'white',
    minWidth: '150px',
    outline: 'none'
  };

  const addButtonStyle = {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const tableContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  };

  const tableHeaderStyle = {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e2e8f0'
  };

  const thStyle = {
    padding: '16px 20px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#2d3748',
    fontSize: '14px',
    borderRight: '1px solid #e2e8f0'
  };

  const tdStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid #f1f5f9',
    borderRight: '1px solid #f1f5f9',
    color: '#4a5568'
  };

  const employeeRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    color: '#4a5568',
    fontSize: '16px'
  };

  const employeeInfoStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const employeeNameStyle = {
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '2px'
  };

  const employeeIdStyle = {
    fontSize: '12px',
    color: '#718096'
  };

  const actionButtonStyle = {
    padding: '6px 12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginRight: '8px',
    transition: 'all 0.2s ease'
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#fbbf24',
    color: 'white'
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#ef4444',
    color: 'white'
  };

  const checkInButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#10b981',
    color: 'white'
  };

  const checkOutButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: '#f59e0b',
    color: 'white'
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#718096'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '48px 24px',
    color: '#718096'
  };

  const badgeStyle = {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  };

  const attendanceStatusStyle = {
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '8px',
    marginTop: '2px',
    display: 'inline-block'
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': { bg: '#dbeafe', color: '#1e40af' },
      'Marketing': { bg: '#fecaca', color: '#dc2626' },
      'Sales': { bg: '#d1fae5', color: '#059669' },
      'HR': { bg: '#fef3c7', color: '#d97706' },
      'Finance': { bg: '#e0e7ff', color: '#5b21b6' },
      'Operations': { bg: '#fed7d7', color: '#c53030' }
    };
    return colors[department] || { bg: '#f3f4f6', color: '#374151' };
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAttendanceStatusBadge = (employeeId) => {
    const status = attendanceStatus[employeeId];
    if (!status) return null;

    if (status.isCheckedIn) {
      return (
        <div style={{
          ...attendanceStatusStyle,
          backgroundColor: '#d1fae5',
          color: '#059669'
        }}>
          ✓ Checked In ({status.checkInTime})
        </div>
      );
    } else if (status.checkOutTime) {
      return (
        <div style={{
          ...attendanceStatusStyle,
          backgroundColor: '#fef3c7',
          color: '#d97706'
        }}>
          ⏰ Checked Out ({status.checkOutTime})
        </div>
      );
    }
    return (
      <div style={{
        ...attendanceStatusStyle,
        backgroundColor: '#fee2e2',
        color: '#dc2626'
      }}>
        ⏸ Not Checked In
      </div>
    );
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div>
          <div style={{ marginBottom: '16px', fontSize: '24px' }}>⏳</div>
          Loading employees...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <div style={decorativeCircleStyle}></div>
        <h1 style={titleStyle}>👥 Employee Management</h1>
        <p style={subtitleStyle}>
          Manage your workforce and track employee information & attendance
        </p>
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <div style={statValueStyle}>{employees.length}</div>
            <div style={statLabelStyle}>Total Employees</div>
          </div>
          <div style={statItemStyle}>
            <div style={statValueStyle}>{departments.length}</div>
            <div style={statLabelStyle}>Departments</div>
          </div>
          <div style={statItemStyle}>
            <div style={statValueStyle}>
              {Object.values(attendanceStatus).filter(s => s.isCheckedIn).length}
            </div>
            <div style={statLabelStyle}>Checked In Today</div>
          </div>
          <div style={statItemStyle}>
            <div style={statValueStyle}>{filteredEmployees.length}</div>
            <div style={statLabelStyle}>Showing</div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div style={controlsStyle}>
        <div style={searchFilterGroupStyle}>
          <input
            type="text"
            placeholder="🔍 Search by name, email or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={searchInputStyle}
          />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            style={selectStyle}
          >
            <option value="All">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="employee_id">Sort by ID</option>
          </select>
        </div>
        <Link 
          to="/add-employee" 
          style={addButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          ➕ Add New Employee
        </Link>
      </div>

      {/* Table Section */}
      <div style={tableContainerStyle}>
        {filteredEmployees.length === 0 ? (
          <div style={emptyStateStyle}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <h3 style={{ color: '#4a5568', marginBottom: '8px' }}>No employees found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <table style={tableStyle}>
            <thead style={tableHeaderStyle}>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Employee</th>
                <th style={thStyle}>Employee ID</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Position</th>
                <th style={thStyle}>Attendance Status</th>
                <th style={{ ...thStyle, borderRight: 'none' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => {
                const currentAttendanceStatus = attendanceStatus[employee.id];
                return (
                  <tr 
                    key={employee.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbfc'
                    }}
                  >
                    <td style={{ ...tdStyle, fontWeight: '600', color: '#2d3748' }}>
                      {index + 1}
                    </td>
                    <td style={tdStyle}>
                      <div style={employeeRowStyle}>
                        <div style={avatarStyle}>
                          {getInitials(employee.first_name, employee.last_name)}
                        </div>
                        <div style={employeeInfoStyle}>
                          <div style={employeeNameStyle}>
                            {employee.first_name} {employee.last_name}
                          </div>
                          <div style={employeeIdStyle}>
                            ID: {employee.employee_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: '600', color: '#2d3748' }}>
                      {employee.employee_id}
                    </td>
                    <td style={tdStyle}>
                      <a 
                        href={`mailto:${employee.email}`}
                        style={{ color: '#4299e1', textDecoration: 'none' }}
                      >
                        {employee.email}
                      </a>
                    </td>
                    <td style={tdStyle}>
                      <span 
                        style={{
                          ...badgeStyle,
                          backgroundColor: getDepartmentColor(employee.department).bg,
                          color: getDepartmentColor(employee.department).color
                        }}
                      >
                        {employee.department}
                      </span>
                    </td>
                    <td style={tdStyle}>{employee.position}</td>
                    <td style={tdStyle}>
                      {getAttendanceStatusBadge(employee.id)}
                    </td>
                    <td style={{ ...tdStyle, borderRight: 'none' }}>
                      <button
                        style={currentAttendanceStatus?.isCheckedIn ? checkOutButtonStyle : checkInButtonStyle}
                        onClick={() => handleCheckInOut(employee)}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = currentAttendanceStatus?.isCheckedIn ? '#d97706' : '#059669';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = currentAttendanceStatus?.isCheckedIn ? '#f59e0b' : '#10b981';
                        }}
                      >
                        {currentAttendanceStatus?.isCheckedIn ? '⏰ Check Out' : '✅ Check In'}
                      </button>
                      <Link 
                        to={`/edit-employee/${employee.id}`}
                        style={editButtonStyle}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f59e0b'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#fbbf24'}
                      >
                        ✏️ Edit
                      </Link>
                      <button 
                        style={deleteButtonStyle}
                        onClick={() => handleDelete(employee.id)}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Summary */}
      {filteredEmployees.length > 0 && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#718096'
        }}>
          Showing {filteredEmployees.length} of {employees.length} employees • {Object.values(attendanceStatus).filter(s => s.isCheckedIn).length} checked in today
        </div>
      )}
    </div>
  );
};

export default EmployeeList;