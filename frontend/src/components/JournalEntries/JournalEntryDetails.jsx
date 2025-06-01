import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams,  useNavigate } from 'react-router-dom';

const JournalEntryDetails = () => {
  const { id } = useParams();
  const [journalEntry, setJournalEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/journal-entries/${id}`);
        setJournalEntry(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching journal entry:', error);
        setLoading(false);
      }
    };

    fetchJournalEntry();
  }, [id]);

  const handlePost = async () => {
    try {
      await axios.put(`http://localhost:7000/api/journal-entries/${id}/post`);
      navigate('/journal-entries');
    } catch (error) {
      console.error('Error posting journal entry:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h3" className="text-center">Journal Entry Details</Card.Header>
            <Card.Body>
              <h4>Entry Information</h4>
              <p><strong>Entry Number:</strong> {journalEntry.journal_entry.entry_number}</p>
              <p><strong>Entry Date:</strong> {journalEntry.journal_entry.entry_date}</p>
              <p><strong>Description:</strong> {journalEntry.journal_entry.description}</p>
              <p><strong>Reference:</strong> {journalEntry.journal_entry.reference}</p>
              <p><strong>Total Debit:</strong> {journalEntry.journal_entry.total_debit}</p>
              <p><strong>Total Credit:</strong> {journalEntry.journal_entry.total_credit}</p>
              <p><strong>Status:</strong> {journalEntry.journal_entry.status}</p>
              <h4>Details</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Account ID</th>
                    <th>Description</th>
                    <th>Debit Amount</th>
                    <th>Credit Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {journalEntry.details.map(detail => (
                    <tr key={detail.id}>
                      <td>{detail.account_id}</td>
                      <td>{detail.description}</td>
                      <td>{detail.debit_amount}</td>
                      <td>{detail.credit_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {journalEntry.journal_entry.status === 'draft' && (
                <Button variant="success" onClick={handlePost} className="w-100">
                  Post Journal Entry
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JournalEntryDetails;