import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import {  useNavigate, useParams } from 'react-router-dom';

const EditSupplier = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState({
    supplier_code: '',
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
    payment_terms: '',
    tax_id: '',
    website: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/suppliers/${id}`);
        setSupplier(response.data);
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/api/suppliers/${id}`, supplier);
      navigate('/suppliers');
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3" className="text-center">Edit Supplier</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formSupplierCode">
                  <Form.Label>Supplier Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="supplier_code"
                    value={supplier.supplier_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCompanyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="company_name"
                    value={supplier.company_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formContactPerson">
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_person"
                    value={supplier.contact_person}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={supplier.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={supplier.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={supplier.mobile}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={supplier.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={supplier.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    value={supplier.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postal_code"
                    value={supplier.postal_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={supplier.country}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPaymentTerms">
                  <Form.Label>Payment Terms</Form.Label>
                  <Form.Control
                    type="text"
                    name="payment_terms"
                    value={supplier.payment_terms}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTaxId">
                  <Form.Label>Tax ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax_id"
                    value={supplier.tax_id}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formWebsite">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                    type="text"
                    name="website"
                    value={supplier.website}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Update Supplier
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditSupplier;