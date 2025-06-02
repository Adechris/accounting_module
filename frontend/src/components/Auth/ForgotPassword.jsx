import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:7000/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setEmail(''); // Clear form
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles (matching your login component)
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
    backgroundColor: loading ? '#6b7280' : '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: loading ? 'not-allowed' : 'pointer',
    width: '100%',
    marginTop: '16px',
    opacity: loading ? 0.7 : 1
  };

  return (
    <Container style={containerStyle}>
      <Row className="justify-content-center">
        <Col md={6}>
          <div style={headerSectionStyle}>
            <h1 style={titleStyle}>🔐 Forgot Password</h1>
            <p>Enter your email address to receive a password reset link</p>
          </div>

          <Card style={cardStyle}>
            <Card.Body>
              {message && (
                <Alert variant="success" className="mb-3">
                  {message}
                </Alert>
              )}
              
              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    disabled={loading}
                  />
                  <Form.Text className="text-muted">
                    We'll send a password reset link to this email address.
                  </Form.Text>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  style={buttonStyle}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/login" style={{ color: '#10b981', textDecoration: 'none' }}>
                  ← Back to Login
                </Link>
              </div>
            </Card.Body>

            <Card.Footer className="text-center">
              <small>
                Remember your password?{' '}
                <Button 
                  variant="link" 
                  onClick={() => navigate('/login')}
                  style={{ padding: 0, color: '#10b981' }}
                >
                  Sign In
                </Button>
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;