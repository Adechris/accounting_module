 


// import React, { useState, useContext } from 'react';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username, password);
//   };

//   // Styles
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
//     <Container style={containerStyle}>
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <div style={headerSectionStyle}>
//             <h1 style={titleStyle}>🔑 Login</h1>
//             <p>Access your account to manage your details</p>
//           </div>
//           <Card style={cardStyle}>
//             <Card.Body>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formUsername" className="mb-3">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                     style={inputStyle}
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formPassword" className="mb-3">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     style={inputStyle}
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" style={buttonStyle}>
//                   Login
//                 </Button>
//               </Form>
//               <div className="text-center mt-3">
//                 <Link to="/forgot-password" style={{ color: '#10b981', textDecoration: 'none' }}>
//                   Forgot Password?
//                 </Link>
//               </div>
//             </Card.Body>
//             <Card.Footer className="text-center">
//               <small>
//                 Don't have an account?{' '}
//                 <Button variant="link" onClick={() => navigate('/register')}>
//                   Register
//                 </Button>
//               </small>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;


import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const location = useLocation();
  
  // Show session expired message if redirected from inactivity
  const sessionMessage = location.state?.message;

  useEffect(() => {
    // Clear any previous errors when component mounts
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles (keeping your existing styles)
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
            <h1 style={titleStyle}>👋 Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <Card style={cardStyle}>
            <Card.Body style={{ padding: '32px' }}>
              {/* Session expired message */}
              {sessionMessage && (
                <Alert variant="warning" style={{ borderRadius: '12px', marginBottom: '20px' }}>
                  <strong>Session Expired</strong><br />
                  {sessionMessage}
                </Alert>
              )}

              {/* Error message */}
              {error && (
                <Alert variant="danger" style={{ borderRadius: '12px', marginBottom: '20px' }}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: '600', color: '#374151' }}>
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={inputStyle}
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: '600', color: '#374151' }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    color: '#6366f1', 
                    textDecoration: 'none', 
                    fontWeight: '600' 
                  }}
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="text-center mt-3">
                <span style={{ color: '#6b7280' }}>Don't have an account? </span>
                <Link 
                  to="/register" 
                  style={{ 
                    color: '#6366f1', 
                    textDecoration: 'none', 
                    fontWeight: '600' 
                  }}
                >
                  Sign Up
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;