// import React, { useState, useEffect } from 'react';
// import { Button, Container, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ApproveBill = () => {
//   const { id } = useParams();
//   const [bill, setBill] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBill = async () => {
//       try {
//         const response = await axios.get(`http://localhost:7000/api/bills/${id}`);
//         setBill(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching bill:', error);
//         setLoading(false);
//       }
//     };

//     fetchBill();
//   }, [id]);

 

//   const handleApprove = async () => {
//     try {
//       await axios.put(`http://localhost:7000/api/bills/${id}/approve`);
//       console.log('Bill approved successfully, navigating...');
//       toast.error("Failed to approve bill");
//       navigate('/bills');
//     } catch (error) {
//       console.error('Error approving bill:', error);
//     }
//   };
  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card>
//             <Card.Header as="h3" className="text-center">Approve Bill</Card.Header>
//             <Card.Body>
//               <h4>Bill Information</h4>
//               <p><strong>Bill Number:</strong> {bill.bill.bill_number}</p>
//               <p><strong>Supplier Name:</strong> {bill.bill.supplier_name}</p>
//               <p><strong>Bill Date:</strong> {bill.bill.bill_date}</p>
//               <p><strong>Due Date:</strong> {bill.bill.due_date}</p>
//               <p><strong>PO Number:</strong> {bill.bill.po_number}</p>
//               <p><strong>Subtotal:</strong> {bill.bill.subtotal}</p>
//               <p><strong>Tax Rate:</strong> {bill.bill.tax_rate}</p>
//               <p><strong>Tax Amount:</strong> {bill.bill.tax_amount}</p>
//               <p><strong>Total Amount:</strong> {bill.bill.total_amount}</p>
//               <p><strong>Balance Due:</strong> {bill.bill.balance_due}</p>
//               <p><strong>Status:</strong> {bill.bill.status}</p>
//               <p><strong>Notes:</strong> {bill.bill.notes}</p>
//               <Button variant="success" onClick={handleApprove} className="w-100">
//                 Approve Bill
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ApproveBill;





import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApproveBill = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const navigate = useNavigate();

  // Get token from localStorage (adjust based on how you store auth token)
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Create axios instance with auth header
  const createAuthAxios = () => {
    const token = getAuthToken();
    return axios.create({
      baseURL: 'http://localhost:7000/api',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  };

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const authAxios = createAuthAxios();
        const response = await authAxios.get(`/bills/${id}`);
        console.log('Fetched bill:', response.data);
        setBill(response.data);
      } catch (error) {
        console.error('Error fetching bill:', error);
        if (error.response?.status === 401) {
          toast.error("Authentication failed. Please login again.");
          navigate('/login');
        } else {
          toast.error("Failed to fetch bill details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id, navigate]);

  const handleApprove = async () => {
    setApproving(true);
    try {
      const authAxios = createAuthAxios();
      const response = await authAxios.put(`/bills/${id}/approve`);
      
      console.log('Bill approved successfully:', response.data);
      toast.success("Bill approved successfully!");
      navigate('/bills');
      
    } catch (error) {
      console.error('Error approving bill:', error);
      
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        navigate('/login');
      } else if (error.response?.status === 404) {
        toast.error("Bill not found or not pending approval");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to approve bills");
      } else {
        toast.error(error.response?.data?.message || "Failed to approve bill");
      }
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!bill) {
    return <div>Bill not found</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h3" className="text-center">Approve Bill</Card.Header>
            <Card.Body>
              <h4>Bill Information</h4>
              {bill && (
                <>
                  <p><strong>Bill Number:</strong> {bill.bill?.bill_number || bill.bill_number}</p>
                  <p><strong>Supplier Name:</strong> {bill.bill?.supplier_name || bill.supplier_name}</p>
                  <p><strong>Bill Date:</strong> {bill.bill?.bill_date || bill.bill_date}</p>
                  <p><strong>Due Date:</strong> {bill.bill?.due_date || bill.due_date}</p>
                  <p><strong>PO Number:</strong> {bill.bill?.po_number || bill.po_number}</p>
                  <p><strong>Subtotal:</strong> {bill.bill?.subtotal || bill.subtotal}</p>
                  <p><strong>Tax Rate:</strong> {bill.bill?.tax_rate || bill.tax_rate}</p>
                  <p><strong>Tax Amount:</strong> {bill.bill?.tax_amount || bill.tax_amount}</p>
                  <p><strong>Total Amount:</strong> {bill.bill?.total_amount || bill.total_amount}</p>
                  <p><strong>Balance Due:</strong> {bill.bill?.balance_due || bill.balance_due}</p>
                  <p><strong>Status:</strong> {bill.bill?.status || bill.status}</p>
                  <p><strong>Notes:</strong> {bill.bill?.notes || bill.notes}</p>
                  
                  {/* <Button 
                    variant="success" 
                    onClick={handleApprove} 
                    className="w-100"
                    disabled={approving || (bill.bill?.status || bill.status) !== 'pending_approval'}
                  >
                    {approving ? 'Approving...' : 'Approve Bill'}
                  </Button> */}

                  <Button onClick={handleApprove}> {approving ? 'Approving...' : 'Approve Bill'}</Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveBill;