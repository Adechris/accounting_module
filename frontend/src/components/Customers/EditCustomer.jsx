import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    customer_code: '',
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    credit_limit: '',
    payment_terms: '',
    tax_id: '',
    website: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/api/customers/${id}`, customer);
      navigate('/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3" className="text-center">Edit Customer</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCustomerCode">
                  <Form.Label>Customer Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="customer_code"
                    value={customer.customer_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="company_name"
                    value={customer.company_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formContactPerson">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_person"
                    value={customer.contact_person}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={customer.mobile}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={customer.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={customer.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postal_code"
                    value={customer.postal_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={customer.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCreditLimit">
                  <Form.Label>Credit Limit</Form.Label>
                  <Form.Control
                    type="number"
                    name="credit_limit"
                    value={customer.credit_limit}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPaymentTerms">
                  <Form.Label>Payment Terms</Form.Label>
                  <Form.Control
                    type="text"
                    name="payment_terms"
                    value={customer.payment_terms}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTaxId">
                  <Form.Label>Tax ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax_id"
                    value={customer.tax_id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formWebsite">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    name="website"
                    value={customer.website}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Update Customer
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCustomer;