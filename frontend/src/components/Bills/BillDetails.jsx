import React, { useState, useEffect } from 'react';
import { Table,  Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BillDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/bills/${id}`);
        setBill(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bill:', error);
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3" className="text-center">Bill Details</Card.Header>
            <Card.Body>
              <h4>Bill Information</h4>
              <p><strong>Bill Number:</strong> {bill.bill.bill_number}</p>
              <p><strong>Supplier Name:</strong> {bill.bill.supplier_name}</p>
              <p><strong>Bill Date:</strong> {bill.bill.bill_date}</p>
              <p><strong>Due Date:</strong> {bill.bill.due_date}</p>
              <p><strong>PO Number:</strong> {bill.bill.po_number}</p>
              <p><strong>Subtotal:</strong> {bill.bill.subtotal}</p>
              <p><strong>Tax Rate:</strong> {bill.bill.tax_rate}</p>
              <p><strong>Tax Amount:</strong> {bill.bill.tax_amount}</p>
              <p><strong>Total Amount:</strong> {bill.bill.total_amount}</p>
              <p><strong>Balance Due:</strong> {bill.bill.balance_due}</p>
              <p><strong>Status:</strong> {bill.bill.status}</p>
              <p><strong>Notes:</strong> {bill.bill.notes}</p>
              <h4>Items</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bill.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BillDetails;