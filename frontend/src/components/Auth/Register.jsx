import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({
      username,
      email,
      password,
      role,
      first_name: firstName,
      last_name: lastName,
    });
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
    marginBottom: '20px',
    color: 'white',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    fontSize: '16px',
    opacity: '0.9',
    marginBottom: '24px'
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
            <h1 style={titleStyle}>📝 Register</h1>
            <p style={subtitleStyle}>Create your account to get started</p>
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

                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    style={inputStyle}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <Form.Group controlId="formRole" className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    style={inputStyle}
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="manager">Manager</option>
                    <option value="accountant">Accountant</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" style={buttonStyle}>
                  Register
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center">
              <small>
                Already have an account?{' '}
                <Button variant="link" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;