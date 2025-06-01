import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ApproveExpense = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('approved');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/api/expenses/${id}/approve`, { status });
      navigate('/expenses');
    } catch (error) {
      console.error('Error approving expense:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h3" className="text-center">Approve Expense</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    required
                  >
                    <option value="approved">Approve</option>
                    <option value="rejected">Reject</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveExpense;