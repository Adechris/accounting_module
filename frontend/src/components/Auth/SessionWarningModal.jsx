import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';

const SessionWarningModal = () => {
  const { showWarning, continueSession, logout } = useContext(AuthContext);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!showWarning) {
      setCountdown(300);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          logout('inactivity');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showWarning, logout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    continueSession();
  };

  const handleLogout = () => {
    logout('manual');
  };

  const modalStyle = {
    backdropFilter: 'blur(5px)',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white',
    borderRadius: '8px 8px 0 0',
    padding: '20px',
    textAlign: 'center'
  };

  const bodyStyle = {
    padding: '24px',
    textAlign: 'center'
  };

  const countdownStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: '20px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '20px'
  };

  const continueButtonStyle = {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    padding: '10px 20px',
    fontWeight: '600'
  };

  const logoutButtonStyle = {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    padding: '10px 20px',
    fontWeight: '600'
  };

  return (
    <Modal 
      show={showWarning} 
      onHide={handleContinue}
      backdrop="static"
      keyboard={false}
      centered
      style={modalStyle}
    >
      <div style={headerStyle}>
        <h4 style={{ margin: 0, fontSize: '20px' }}>
          ⏰ Session Timeout Warning
        </h4>
      </div>
      
      <Modal.Body style={bodyStyle}>
        <Alert variant="warning" style={{ borderRadius: '8px' }}>
          <strong>Your session is about to expire!</strong>
        </Alert>
        
        <p style={{ margin: '16px 0', color: '#6b7280' }}>
          You will be automatically logged out in:
        </p>
        
        <div style={countdownStyle}>
          {formatTime(countdown)}
        </div>
        
        <p style={{ margin: '16px 0', fontSize: '14px', color: '#6b7280' }}>
          Click "Continue Session" to stay logged in, or "Logout" to end your session now.
        </p>
        
        <div style={buttonContainerStyle}>
          <Button 
            variant="success" 
            onClick={handleContinue}
            style={continueButtonStyle}
          >
            Continue Session
          </Button>
          <Button 
            variant="danger" 
            onClick={handleLogout}
            style={logoutButtonStyle}
          >
            Logout Now
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SessionWarningModal;