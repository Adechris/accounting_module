// import React, { useState, useContext } from 'react';
// import { Button, Container, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { AuthContext } from '../../contexts/AuthContext';

// const ClockInOut = () => {
//   const { user } = useContext(AuthContext);
//   const [action, setAction] = useState('in');
//   const [message, setMessage] = useState('');

//   const handleClock = async () => {
//     try {
//       const response = await axios.post('http://localhost:7000/api/attendance/clock', { action });
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error('Error clocking in/out:', error);
//       setMessage(error.response.data.message);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card>
//             <Card.Header as="h3" className="text-center">Clock In/Out</Card.Header>
//             <Card.Body>
//               <Button variant="primary" onClick={() => { setAction('in'); handleClock(); }} className="w-100 mb-3">
//                 Clock In
//               </Button>
//               <Button variant="danger" onClick={() => { setAction('out'); handleClock(); }} className="w-100">
//                 Clock Out
//               </Button>
//               {message && <p className="mt-3 text-center">{message}</p>}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ClockInOut;













import React, { useState, useEffect } from 'react';

const ClockInOut = () => {
  // Mock user data (replace with actual AuthContext in your app)
  const user = {
    id: 1,
    employee_id: 'EMP001',
    first_name: 'John',
    last_name: 'Doe'
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastAction, setLastAction] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todayStatus, setTodayStatus] = useState({
    clockedIn: false,
    clockInTime: null,
    clockOutTime: null,
    totalHours: 0
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock function to simulate API call
  const handleClock = async (action) => {
    setIsLoading(true);
    setMessage('');

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];

      if (action === 'in') {
        if (todayStatus.clockedIn && !todayStatus.clockOutTime) {
          throw new Error('Already clocked in today');
        }
        
        setTodayStatus({
          clockedIn: true,
          clockInTime: timeString,
          clockOutTime: null,
          totalHours: 0
        });
        
        setMessage(`Clocked in successfully at ${timeString}`);
        setLastAction('in');
      } else if (action === 'out') {
        if (!todayStatus.clockedIn || todayStatus.clockOutTime) {
          throw new Error('No active clock-in found for today');
        }

        const clockInTime = new Date(`${now.toDateString()} ${todayStatus.clockInTime}`);
        const clockOutTime = now;
        const totalHours = ((clockOutTime - clockInTime) / (1000 * 60 * 60)).toFixed(2);

        setTodayStatus(prev => ({
          ...prev,
          clockOutTime: timeString,
          totalHours: parseFloat(totalHours)
        }));

        setMessage(`Clocked out successfully at ${timeString}. Total hours: ${totalHours}`);
        setLastAction('out');
      }
    } catch (error) {
      setMessage(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
    overflow: 'hidden',
    textAlign: 'center'
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

  const decorativeCircle2Style = {
    position: 'absolute',
    bottom: '-30px',
    left: '-30px',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255,255,255,0.08)',
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
    marginBottom: '20px',
    position: 'relative',
    zIndex: 1
  };

  const timeDisplayStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    position: 'relative',
    zIndex: 1
  };

  const dateDisplayStyle = {
    fontSize: '14px',
    opacity: '0.8',
    position: 'relative',
    zIndex: 1
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  };

  const cardHeaderStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px 24px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '12px'
  };

  const clockInButtonStyle = {
    ...buttonStyle,
    backgroundColor: isLoading ? '#9ca3af' : '#10b981',
    color: 'white'
  };

  const clockOutButtonStyle = {
    ...buttonStyle,
    backgroundColor: isLoading ? '#9ca3af' : '#ef4444',
    color: 'white'
  };

  const statusCardStyle = {
    ...cardStyle,
    background: todayStatus.clockedIn ? 
      'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)' : 
      'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)'
  };

  const statusItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e2e8f0'
  };

  const statusLabelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  };

  const statusValueStyle = {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600'
  };

  const messageStyle = {
    padding: '16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '16px',
    backgroundColor: message.includes('successfully') ? '#ecfdf5' : '#fef2f2',
    color: message.includes('successfully') ? '#065f46' : '#991b1b',
    border: `1px solid ${message.includes('successfully') ? '#d1fae5' : '#fecaca'}`
  };

  const userInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px'
  };

  const userDetailsStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const userNameStyle = {
    fontSize: '16px',
    fontWeight: '600'
  };

  const employeeIdStyle = {
    fontSize: '12px',
    opacity: '0.7'
  };

  const isClockInDisabled = isLoading || (todayStatus.clockedIn && !todayStatus.clockOutTime);
  const isClockOutDisabled = isLoading || !todayStatus.clockedIn || todayStatus.clockOutTime;

  return (
    <div style={containerStyle}>
      {/* Header Section */}
      <div style={headerSectionStyle}>
        <div style={decorativeCircleStyle}></div>
        <div style={decorativeCircle2Style}></div>
        <h1 style={titleStyle}>⏰ Time Clock</h1>
        <p style={subtitleStyle}>Track your work hours with ease</p>
        
        <div style={userInfoStyle}>
          <div style={avatarStyle}>
            {user.first_name[0]}{user.last_name[0]}
          </div>
          <div style={userDetailsStyle}>
            <div style={userNameStyle}>{user.first_name} {user.last_name}</div>
            <div style={employeeIdStyle}>Employee ID: {user.employee_id}</div>
          </div>
        </div>

        <div style={timeDisplayStyle}>{formatTime(currentTime)}</div>
        <div style={dateDisplayStyle}>{formatDate(currentTime)}</div>
      </div>

      {/* Main Content */}
      <div style={cardContainerStyle}>
        {/* Clock Actions Card */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            🕐 Clock Actions
          </div>
          
          <button
            style={clockInButtonStyle}
            onClick={() => handleClock('in')}
            disabled={isClockInDisabled}
            onMouseEnter={(e) => !isClockInDisabled && (e.target.style.backgroundColor = '#059669')}
            onMouseLeave={(e) => !isClockInDisabled && (e.target.style.backgroundColor = '#10b981')}
          >
            {isLoading && lastAction === 'in' ? (
              <>⏳ Clocking In...</>
            ) : (
              <>🟢 Clock In</>
            )}
          </button>

          <button
            style={clockOutButtonStyle}
            onClick={() => handleClock('out')}
            disabled={isClockOutDisabled}
            onMouseEnter={(e) => !isClockOutDisabled && (e.target.style.backgroundColor = '#dc2626')}
            onMouseLeave={(e) => !isClockOutDisabled && (e.target.style.backgroundColor = '#ef4444')}
          >
            {isLoading && lastAction === 'out' ? (
              <>⏳ Clocking Out...</>
            ) : (
              <>🔴 Clock Out</>
            )}
          </button>

          {message && <div style={messageStyle}>{message}</div>}
        </div>

        {/* Today's Status Card */}
        <div style={statusCardStyle}>
          <div style={cardHeaderStyle}>
            📊 Today's Status
          </div>

          <div style={statusItemStyle}>
            <span style={statusLabelStyle}>Status</span>
            <span style={statusValueStyle}>
              {todayStatus.clockedIn ? 
                (todayStatus.clockOutTime ? '✅ Completed' : '🟡 Active') : 
                '⭕ Not Started'
              }
            </span>
          </div>

          <div style={statusItemStyle}>
            <span style={statusLabelStyle}>Clock In Time</span>
            <span style={statusValueStyle}>
              {todayStatus.clockInTime || '--:--:--'}
            </span>
          </div>

          <div style={statusItemStyle}>
            <span style={statusLabelStyle}>Clock Out Time</span>
            <span style={statusValueStyle}>
              {todayStatus.clockOutTime || '--:--:--'}
            </span>
          </div>

          <div style={{...statusItemStyle, borderBottom: 'none'}}>
            <span style={statusLabelStyle}>Total Hours</span>
            <span style={statusValueStyle}>
              {todayStatus.totalHours > 0 ? `${todayStatus.totalHours}h` : '--'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;