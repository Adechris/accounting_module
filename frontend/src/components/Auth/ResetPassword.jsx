// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
// import { useNavigate, useParams, Link } from 'react-router-dom'; // Changed: useParams instead of useSearchParams
// import axios from 'axios';

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { token } = useParams(); // Changed: Extract token from URL params
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       setError('Invalid reset link. Please request a new password reset.');
//     }
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     // Validation
//     if (!newPassword || !confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (newPassword.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:7000'}/api/auth/reset-password`, {
//         token,
//         newPassword
//       });

//       setMessage(response.data.message);
      
//       // Redirect to login after 3 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);

//     } catch (err) {
//         alert(err)
//       setError(err.response?.data?.message || 'An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Styles (same as login component)
//   const containerStyle = {
//     padding: 0,
//     maxWidth: '100%',
//     minHeight: '100vh',
//     marginTop: '40px',
//     backgroundColor: '#f8fafc'
//   };

//   const headerSectionStyle = {
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     borderRadius: '20px',
//     padding: '32px',
//     marginBottom: '32px',
//     color: 'white',
//     textAlign: 'center'
//   };

//   const titleStyle = {
//     fontSize: '32px',
//     fontWeight: '700',
//     marginBottom: '8px'
//   };

//   const cardStyle = {
//     borderRadius: '20px',
//     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
//   };

//   const inputStyle = {
//     borderRadius: '12px',
//     border: '2px solid #e2e8f0',
//     padding: '12px 16px',
//     fontSize: '14px',
//     transition: 'all 0.3s ease',
//     outline: 'none'
//   };

//   const buttonStyle = {
//     backgroundColor: '#10b981',
//     color: 'white',
//     border: 'none',
//     borderRadius: '12px',
//     padding: '12px 24px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     width: '100%',
//     marginTop: '16px'
//   };

//   return (
//     <Container fluid style={containerStyle}>
//       <Row className="justify-content-center">
//         <Col lg={5} md={7} sm={9}>
//           <div style={headerSectionStyle}>
//             <h1 style={titleStyle}>🔑 Reset Password</h1>
//             <p>Enter your new password below</p>
//           </div>

//           <Card style={cardStyle}>
//             <Card.Body style={{ padding: '32px' }}>
//               {error && (
//                 <Alert variant="danger" style={{ borderRadius: '12px', marginBottom: '20px' }}>
//                   {error}
//                 </Alert>
//               )}
              
//               {message && (
//                 <Alert variant="success" style={{ borderRadius: '12px', marginBottom: '20px' }}>
//                   {message}
//                   <br />
//                   <small>Redirecting to login page...</small>
//                 </Alert>
//               )}

//               {!token ? (
//                 <div className="text-center">
//                   <Alert variant="danger" style={{ borderRadius: '12px' }}>
//                     Invalid reset link. Please request a new password reset.
//                   </Alert>
//                   <Link to="/forgot-password" className="btn" style={buttonStyle}>
//                     Request New Reset Link
//                   </Link>
//                 </div>
//               ) : (
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label style={{ fontWeight: '600', color: '#374151' }}>
//                       New Password
//                     </Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter your new password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       required
//                       style={inputStyle}
//                       disabled={loading}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label style={{ fontWeight: '600', color: '#374151' }}>
//                       Confirm New Password
//                     </Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Confirm your new password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       required
//                       style={inputStyle}
//                       disabled={loading}
//                     />
//                   </Form.Group>

//                   <Button 
//                     type="submit" 
//                     style={buttonStyle}
//                     disabled={loading}
//                   >
//                     {loading ? 'Resetting Password...' : 'Reset Password'}
//                   </Button>
//                 </Form>
//               )}

//               <div className="text-center mt-4">
//                 <Link 
//                   to="/login" 
//                   style={{ 
//                     color: '#6366f1', 
//                     textDecoration: 'none', 
//                     fontWeight: '600' 
//                   }}
//                 >
//                   ← Back to Login
//                 </Link>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ResetPassword;
















import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Changed: useParams instead of useSearchParams
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // Changed: Extract token from URL params
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token from URL:', token); // Debug log
    if (!token) {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validation
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:7000'}/api/auth/reset-password/${token}`, {
        newPassword
      });

      setMessage(response.data.message);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles (same as login component)
  const containerStyle = {
    padding: 0,
    maxWidth: '100%',
    minHeight: '100vh',
    marginTop: '40px',
    backgroundColor: '#f8fafc'
  };

  const headerSectionStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    color: 'white',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px'
  };

  const cardStyle = {
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    padding: '12px 16px',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const buttonStyle = {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    marginTop: '16px'
  };

  return (
    <Container fluid style={containerStyle}>
      <Row className="justify-content-center">
        <Col lg={5} md={7} sm={9}>
          <div style={headerSectionStyle}>
            <h1 style={titleStyle}>🔑 Reset Password</h1>
            <p>Enter your new password below</p>
          </div>

          <Card style={cardStyle}>
            <Card.Body style={{ padding: '32px' }}>
              {error && (
                <Alert variant="danger" style={{ borderRadius: '12px', marginBottom: '20px' }}>
                  {error}
                </Alert>
              )}
              
              {message && (
                <Alert variant="success" style={{ borderRadius: '12px', marginBottom: '20px' }}>
                  {message}
                  <br />
                  <small>Redirecting to login page...</small>
                </Alert>
              )}

              {!token ? (
                <div className="text-center">
                  <Alert variant="danger" style={{ borderRadius: '12px' }}>
                    Invalid reset link. Please request a new password reset.
                  </Alert>
                  <Link to="/forgot-password" className="btn" style={buttonStyle}>
                    Request New Reset Link
                  </Link>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#374151' }}>
                      New Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      style={inputStyle}
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#374151' }}>
                      Confirm New Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={inputStyle}
                      disabled={loading}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    style={buttonStyle}
                    disabled={loading}
                  >
                    {loading ? 'Resetting Password...' : 'Reset Password'}
                  </Button>
                </Form>
              )}

              <div className="text-center mt-4">
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#6366f1', 
                    textDecoration: 'none', 
                    fontWeight: '600' 
                  }}
                >
                  ← Back to Login
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;