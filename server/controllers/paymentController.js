

  
//   // =============================================================================
//   // PAYMENT ROUTES
//   // =============================================================================
  
//   // Get all payments
//   app.get('/api/payments', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const { payment_type, date_from, date_to, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = `
//         SELECT p.*, 
//                c.company_name as customer_name,
//                s.company_name as supplier_name,
//                ba.account_name as bank_account_name
//         FROM payments p 
//         LEFT JOIN customers c ON p.customer_id = c.id
//         LEFT JOIN suppliers s ON p.supplier_id = s.id
//         LEFT JOIN bank_accounts ba ON p.bank_account_id = ba.id
//         WHERE 1=1
//       `;
//       let params = [];
  
//       if (payment_type) {
//         query += ' AND p.payment_type = ?';
//         params.push(payment_type);
//       }
  
//       if (date_from) {
//         query += ' AND p.payment_date >= ?';
//         params.push(date_from);
//       }
  
//       if (date_to) {
//         query += ' AND p.payment_date <= ?';
//         params.push(date_to);
//       }
  
//       query += ' ORDER BY p.payment_date DESC LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       res.json({ payments: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create payment
//   app.post('/api/payments', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     const connection = await pool.getConnection();
//     try {
//       await connection.beginTransaction();
  
//       const {
//         payment_number, payment_type, customer_id, supplier_id, invoice_id, bill_id,
//         payment_date, amount, payment_method, bank_account_id, check_number, reference, memo
//       } = req.body;
  
//       // Insert payment
//       const [paymentResult] = await connection.execute(
//         `INSERT INTO payments (payment_number, payment_type, customer_id, supplier_id, invoice_id, bill_id,
//          payment_date, amount, payment_method, bank_account_id, check_number, reference, memo, created_by) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [payment_number, payment_type, customer_id, supplier_id, invoice_id, bill_id,
//          payment_date, amount, payment_method, bank_account_id, check_number, reference, memo, req.user.id]
//       );
  
//       // Update invoice/bill paid amount and status
//       if (payment_type === 'received' && invoice_id) {
//         const [invoiceRows] = await connection.execute('SELECT * FROM invoices WHERE id = ?', [invoice_id]);
//         if (invoiceRows.length > 0) {
//           const invoice = invoiceRows[0];
//           const new_paid_amount = parseFloat(invoice.paid_amount) + parseFloat(amount);
//           const new_balance = parseFloat(invoice.total_amount) - new_paid_amount;
          
//           let payment_status = 'partial';
//           let invoice_status = 'partial_payment';
          
//           if (new_balance <= 0.01) {
//             payment_status = 'paid';
//             invoice_status = 'paid';
//           }
  
//           await connection.execute(
//             'UPDATE invoices SET paid_amount = ?, balance_due = ?, payment_status = ?, status = ? WHERE id = ?',
//             [new_paid_amount, new_balance, payment_status, invoice_status, invoice_id]
//           );
//         }
//       } else if (payment_type === 'made' && bill_id) {
//         const [billRows] = await connection.execute('SELECT * FROM bills WHERE id = ?', [bill_id]);
//         if (billRows.length > 0) {
//           const bill = billRows[0];
//           const new_paid_amount = parseFloat(bill.paid_amount) + parseFloat(amount);
//           const new_balance = parseFloat(bill.total_amount) - new_paid_amount;
          
//           let payment_status = 'partial';
//           let bill_status = 'approved';
          
//           if (new_balance <= 0.01) {
//             payment_status = 'paid';
//             bill_status = 'paid';
//           }
  
//           await connection.execute(
//             'UPDATE bills SET paid_amount = ?, balance_due = ?, payment_status = ?, status = ? WHERE id = ?',
//             [new_paid_amount, new_balance, payment_status, bill_status, bill_id]
//           );
//         }
//       }
  
//       // Update bank account balance
//       if (bank_account_id) {
//         const balance_change = payment_type === 'received' ? amount : -amount;
//         await connection.execute(
//           'UPDATE bank_accounts SET current_balance = current_balance + ? WHERE id = ?',
//           [balance_change, bank_account_id]
//         );
//       }
  
//       await connection.commit();
  
//       await logAuditTrail('payments', paymentResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Payment created successfully', paymentId: paymentResult.insertId });
//     } catch (error) {
//       await connection.rollback();
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     } finally {
//       connection.release();
//     }
//   });




import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const { payment_type, date_from, date_to, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*,
             c.company_name as customer_name,
             s.company_name as supplier_name,
             ba.account_name as bank_account_name
      FROM payments p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN suppliers s ON p.supplier_id = s.id
      LEFT JOIN bank_accounts ba ON p.bank_account_id = ba.id
      WHERE 1=1
    `;
    let params = [];

    if (payment_type) {
      query += ' AND p.payment_type = ?';
      params.push(payment_type);
    }

    if (date_from) {
      query += ' AND p.payment_date >= ?';
      params.push(date_from);
    }

    if (date_to) {
      query += ' AND p.payment_date <= ?';
      params.push(date_to);
    }

    query += ' ORDER BY p.payment_date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);
    res.json({ payments: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create payment
export const createPayment = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      payment_number, payment_type, customer_id, supplier_id, invoice_id, bill_id,
      payment_date, amount, payment_method, bank_account_id, check_number, reference, memo
    } = req.body;

    const [paymentResult] = await connection.execute(
      `INSERT INTO payments (payment_number, payment_type, customer_id, supplier_id, invoice_id, bill_id,
       payment_date, amount, payment_method, bank_account_id, check_number, reference, memo, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [payment_number, payment_type, customer_id, supplier_id, invoice_id, bill_id,
       payment_date, amount, payment_method, bank_account_id, check_number, reference, memo, req.user.id]
    );

    if (payment_type === 'received' && invoice_id) {
      const [invoiceRows] = await connection.execute('SELECT * FROM invoices WHERE id = ?', [invoice_id]);
      if (invoiceRows.length > 0) {
        const invoice = invoiceRows[0];
        const new_paid_amount = parseFloat(invoice.paid_amount) + parseFloat(amount);
        const new_balance = parseFloat(invoice.total_amount) - new_paid_amount;

        let payment_status = 'partial';
        let invoice_status = 'partial_payment';

        if (new_balance <= 0.01) {
          payment_status = 'paid';
          invoice_status = 'paid';
        }

        await connection.execute(
          'UPDATE invoices SET paid_amount = ?, balance_due = ?, payment_status = ?, status = ? WHERE id = ?',
          [new_paid_amount, new_balance, payment_status, invoice_status, invoice_id]
        );
      }
    } else if (payment_type === 'made' && bill_id) {
      const [billRows] = await connection.execute('SELECT * FROM bills WHERE id = ?', [bill_id]);
      if (billRows.length > 0) {
        const bill = billRows[0];
        const new_paid_amount = parseFloat(bill.paid_amount) + parseFloat(amount);
        const new_balance = parseFloat(bill.total_amount) - new_paid_amount;

        let payment_status = 'partial';
        let bill_status = 'approved';

        if (new_balance <= 0.01) {
          payment_status = 'paid';
          bill_status = 'paid';
        }

        await connection.execute(
          'UPDATE bills SET paid_amount = ?, balance_due = ?, payment_status = ?, status = ? WHERE id = ?',
          [new_paid_amount, new_balance, payment_status, bill_status, bill_id]
        );
      }
    }

    if (bank_account_id) {
      const balance_change = payment_type === 'received' ? amount : -amount;
      await connection.execute(
        'UPDATE bank_accounts SET current_balance = current_balance + ? WHERE id = ?',
        [balance_change, bank_account_id]
      );
    }

    await connection.commit();

    await logAuditTrail('payments', paymentResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Payment created successfully', paymentId: paymentResult.insertId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
};
