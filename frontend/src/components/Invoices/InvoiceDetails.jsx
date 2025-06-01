import React, { useState, useEffect } from 'react';
import { Table,  Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/invoices/${id}`);
        setInvoice(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoice:', error);
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3" className="text-center">Invoice Details</Card.Header>
            <Card.Body>
              <h4>Invoice Information</h4>
              <p><strong>Invoice Number:</strong> {invoice.invoice.invoice_number}</p>
              <p><strong>Customer Name:</strong> {invoice.invoice.customer_name}</p>
              <p><strong>Invoice Date:</strong> {invoice.invoice.invoice_date}</p>
              <p><strong>Due Date:</strong> {invoice.invoice.due_date}</p>
              <p><strong>Subtotal:</strong> {invoice.invoice.subtotal}</p>
              <p><strong>Tax Rate:</strong> {invoice.invoice.tax_rate}</p>
              <p><strong>Tax Amount:</strong> {invoice.invoice.tax_amount}</p>
              <p><strong>Discount Rate:</strong> {invoice.invoice.discount_rate}</p>
              <p><strong>Discount Amount:</strong> {invoice.invoice.discount_amount}</p>
              <p><strong>Total Amount:</strong> {invoice.invoice.total_amount}</p>
              <p><strong>Balance Due:</strong> {invoice.invoice.balance_due}</p>
              <p><strong>Status:</strong> {invoice.invoice.status}</p>
              <p><strong>Terms and Conditions:</strong> {invoice.invoice.terms_conditions}</p>
              <p><strong>Notes:</strong> {invoice.invoice.notes}</p>
              <h4>Items</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount Rate</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit_price}</td>
                      <td>{item.discount_rate}</td>
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

export default InvoiceDetails;




















// import React, { useState, useEffect } from 'react';
// import { Table, Container, Row, Col, Card, Badge } from 'react-bootstrap';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { format } from 'date-fns';

// const InvoiceDetails = () => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const response = await axios.get(`http://localhost:7000/api/invoices/${id}`);
//         setInvoice(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching invoice:', error);
//         setLoading(false);
//       }
//     };

//     fetchInvoice();
//   }, [id]);

//   const getStatusBadge = (status) => {
//     switch (status.toLowerCase()) {
//       case 'paid':
//         return 'success';
//       case 'pending':
//         return 'warning';
//       case 'overdue':
//         return 'danger';
//       case 'draft':
//         return 'secondary';
//       default:
//         return 'primary';
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '-';
//     return format(new Date(dateString), 'MMM dd, yyyy');
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount || 0);
//   };

//   if (loading) {
//     return (
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col md={8}>
//             <div className="text-center">Loading invoice details...</div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   if (!invoice) {
//     return (
//       <Container className="mt-5">
//         <Row className="justify-content-center">
//           <Col md={8}>
//             <div className="text-center">Invoice not found</div>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-4 mb-5">
//       <Row className="justify-content-center">
//         <Col xl={10}>
//           <Card className="invoice-card">
//             <Card.Body>
//               {/* Invoice Header */}
//               <Row className="mb-4">
//                 <Col md={6}>
//                   <h2 className="mb-3">INVOICE</h2>
//                   <div className="mb-2">
//                     <strong>Invoice #:</strong> {invoice.invoice.invoice_number}
//                   </div>
//                   <div className="mb-2">
//                     <strong>Date Issued:</strong> {formatDate(invoice.invoice.invoice_date)}
//                   </div>
//                   <div className="mb-2">
//                     <strong>Due Date:</strong> {formatDate(invoice.invoice.due_date)}
//                   </div>
//                   <div>
//                     <strong>Status:</strong>{' '}
//                     <Badge pill bg={getStatusBadge(invoice.invoice.status)}>
//                       {invoice.invoice.status}
//                     </Badge>
//                   </div>
//                 </Col>
//                 <Col md={6} className="text-md-end">
//                   <h3 className="mb-3">Your Company</h3>
//                   <div>123 Business Street</div>
//                   <div>City, State 10001</div>
//                   <div>Phone: (123) 456-7890</div>
//                   <div>Email: billing@yourcompany.com</div>
//                 </Col>
//               </Row>

//               {/* Customer Info */}
//               <Row className="mb-4">
//                 <Col md={6}>
//                   <div className="bg-light p-3 rounded">
//                     <h5>Bill To:</h5>
//                     <div className="fw-bold">{invoice.invoice.customer_name}</div>
//                     <div>{invoice.invoice.customer_address}</div>
//                     <div>{invoice.invoice.customer_email}</div>
//                     <div>{invoice.invoice.customer_phone}</div>
//                   </div>
//                 </Col>
//                 <Col md={6} className="text-md-end mt-3 mt-md-0">
//                   <div className="bg-light p-3 rounded">
//                     <h5>Payment Info</h5>
//                     <div>
//                       <strong>Total Due:</strong> {formatCurrency(invoice.invoice.total_amount)}
//                     </div>
//                     <div>
//                       <strong>Balance Due:</strong> {formatCurrency(invoice.invoice.balance_due)}
//                     </div>
//                     <div>
//                       <strong>Payment Terms:</strong> {invoice.invoice.terms_conditions || 'Due on receipt'}
//                     </div>
//                   </div>
//                 </Col>
//               </Row>

//               {/* Items Table */}
//               <div className="table-responsive mb-4">
//                 <Table striped bordered hover className="mb-0">
//                   <thead className="table-dark">
//                     <tr>
//                       <th>#</th>
//                       <th>Description</th>
//                       <th className="text-end">Quantity</th>
//                       <th className="text-end">Unit Price</th>
//                       <th className="text-end">Discount</th>
//                       <th className="text-end">Amount</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {invoice.items.map((item, index) => (
//                       <tr key={item.id}>
//                         <td>{index + 1}</td>
//                         <td>{item.description}</td>
//                         <td className="text-end">{item.quantity}</td>
//                         <td className="text-end">{formatCurrency(item.unit_price)}</td>
//                         <td className="text-end">{item.discount_rate}%</td>
//                         <td className="text-end">{formatCurrency(item.total_price)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>

//               {/* Totals */}
//               <Row>
//                 <Col md={{ span: 6, offset: 6 }}>
//                   <Table borderless>
//                     <tbody>
//                       <tr>
//                         <td className="text-end fw-bold">Subtotal:</td>
//                         <td className="text-end">{formatCurrency(invoice.invoice.subtotal)}</td>
//                       </tr>
//                       <tr>
//                         <td className="text-end fw-bold">Tax ({invoice.invoice.tax_rate}%):</td>
//                         <td className="text-end">{formatCurrency(invoice.invoice.tax_amount)}</td>
//                       </tr>
//                       <tr>
//                         <td className="text-end fw-bold">Discount ({invoice.invoice.discount_rate}%):</td>
//                         <td className="text-end">-{formatCurrency(invoice.invoice.discount_amount)}</td>
//                       </tr>
//                       <tr className="border-top">
//                         <td className="text-end fw-bold">Total:</td>
//                         <td className="text-end fw-bold">{formatCurrency(invoice.invoice.total_amount)}</td>
//                       </tr>
//                     </tbody>
//                   </Table>
//                 </Col>
//               </Row>

//               {/* Notes */}
//               {invoice.invoice.notes && (
//                 <Row className="mt-4">
//                   <Col>
//                     <div className="bg-light p-3 rounded">
//                       <h5>Notes</h5>
//                       <p className="mb-0">{invoice.invoice.notes}</p>
//                     </div>
//                   </Col>
//                 </Row>
//               )}

//               {/* Footer */}
//               <Row className="mt-5">
//                 <Col className="text-center">
//                   <p className="text-muted">
//                     Thank you for your business! Please make payments payable to Your Company.
//                   </p>
//                   <p className="text-muted">
//                     Questions? Email billing@yourcompany.com or call (123) 456-7890
//                   </p>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default InvoiceDetails;