import React, { useState  } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditInvoiceStatus = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/api/invoices/${id}/status`, { status });
      navigate('/invoices');
    } catch (error) {
      console.error('Error updating invoice status:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h3" className="text-center">Edit Invoice Status</Card.Header>
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
                    <option value="">Select Status</option>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Update Status
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditInvoiceStatus;