// import React, { useState, useContext } from 'react';
// import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
// import { AuthContext } from '../../contexts/AuthContext';
// import {   useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username, password);
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card>
//             <Card.Header as="h3" className="text-center">Login</Card.Header>
//             <Card.Body>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formUsername">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" type="submit" className="w-100">
//                   Login
//                 </Button>
//               </Form>
//             </Card.Body>
//             <Card.Footer className="text-center">
//               <small>
//                 Don't have an account? <Button variant="link" onClick={() =>navigate('/register')}>Register</Button>
//               </small>
//             </Card.Footer>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;



import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  // Styles
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
    <Container style={containerStyle}>
      <Row className="justify-content-center">
        <Col md={6}>
          <div style={headerSectionStyle}>
            <h1 style={titleStyle}>🔑 Login</h1>
            <p>Access your account to manage your details</p>
          </div>
          <Card style={cardStyle}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" style={buttonStyle}>
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/forgot-password" style={{ color: '#10b981', textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <small>
                Don't have an account?{' '}
                <Button variant="link" onClick={() => navigate('/register')}>
                  Register
                </Button>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;