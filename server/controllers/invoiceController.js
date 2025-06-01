  
  // // =============================================================================
  // // INVOICE ROUTES
  // // =============================================================================
  
  // // Get all invoices
  // app.get('/api/invoices', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   try {
  //     const { status, customer_id, date_from, date_to, page = 1, limit = 10 } = req.query;
  //     const offset = (page - 1) * limit;
  
  //     let query = `
  //       SELECT i.*, c.company_name as customer_name, c.customer_code
  //       FROM invoices i 
  //       JOIN customers c ON i.customer_id = c.id 
  //       WHERE 1=1
  //     `;
  //     let params = [];
  
  //     if (status) {
  //       query += ' AND i.status = ?';
  //       params.push(status);
  //     }
  
  //     if (customer_id) {
  //       query += ' AND i.customer_id = ?';
  //       params.push(customer_id);
  //     }
  
  //     if (date_from) {
  //       query += ' AND i.invoice_date >= ?';
  //       params.push(date_from);
  //     }
  
  //     if (date_to) {
  //       query += ' AND i.invoice_date <= ?';
  //       params.push(date_to);
  //     }
  
  //     query += ' ORDER BY i.invoice_date DESC LIMIT ? OFFSET ?';
  //     params.push(parseInt(limit), parseInt(offset));
  
  //     const [rows] = await pool.execute(query, params);
  //     res.json({ invoices: rows });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });
  
  // // Get invoice by ID with items
  // app.get('/api/invoices/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   try {
  //     const [invoiceRows] = await pool.execute(
  //       `SELECT i.*, c.company_name as customer_name, c.customer_code, c.email as customer_email
  //        FROM invoices i 
  //        JOIN customers c ON i.customer_id = c.id 
  //        WHERE i.id = ?`,
  //       [req.params.id]
  //     );
  
  //     if (invoiceRows.length === 0) {
  //       return res.status(404).json({ message: 'Invoice not found' });
  //     }
  
  //     const [itemRows] = await pool.execute(
  //       'SELECT * FROM invoice_items WHERE invoice_id = ?',
  //       [req.params.id]
  //     );
  
  //     res.json({
  //       invoice: invoiceRows[0],
  //       items: itemRows
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });
  
  // // Create invoice
  // app.post('/api/invoices', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   const connection = await pool.getConnection();
  //   try {
  //     await connection.beginTransaction();
  
  //     const {
  //       invoice_number, customer_id, invoice_date, due_date, tax_rate, discount_rate,
  //       terms_conditions, notes, items
  //     } = req.body;
  
  //     // Calculate totals
  //     const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  //     const discount_amount = subtotal * (discount_rate || 0) / 100;
  //     const taxable_amount = subtotal - discount_amount;
  //     const tax_amount = taxable_amount * (tax_rate || 0) / 100;
  //     const total_amount = taxable_amount + tax_amount;
  
  //     // Insert invoice
  //     const [invoiceResult] = await connection.execute(
  //       `INSERT INTO invoices (invoice_number, customer_id, invoice_date, due_date, subtotal, 
  //        tax_rate, tax_amount, discount_rate, discount_amount, total_amount, balance_due, 
  //        terms_conditions, notes, created_by) 
  //        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  //       [invoice_number, customer_id, invoice_date, due_date, subtotal, tax_rate || 0, 
  //        tax_amount, discount_rate || 0, discount_amount, total_amount, total_amount, 
  //        terms_conditions, notes, req.user.id]
  //     );
  
  //     // Insert invoice items
  //     for (const item of items) {
  //       const item_total = item.quantity * item.unit_price * (1 - (item.discount_rate || 0) / 100);
  //       await connection.execute(
  //         'INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, discount_rate, total_price, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
  //         [invoiceResult.insertId, item.description, item.quantity, item.unit_price, item.discount_rate || 0, item_total, item.account_id]
  //       );
  //     }
  
  //     await connection.commit();
  
  //     await logAuditTrail('invoices', invoiceResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
  //     res.status(201).json({ message: 'Invoice created successfully', invoiceId: invoiceResult.insertId });
  //   } catch (error) {
  //     await connection.rollback();
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   } finally {
  //     connection.release();
  //   }
  // });
  
  // // Update invoice status
  // app.put('/api/invoices/:id/status', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   try {
  //     const { status } = req.body;
      
  //     const [oldRows] = await pool.execute('SELECT * FROM invoices WHERE id = ?', [req.params.id]);
  //     if (oldRows.length === 0) {
  //       return res.status(404).json({ message: 'Invoice not found' });
  //     }
  
  //     const updateData = { status };
  //     if (status === 'sent') {
  //       updateData.sent_date = new Date().toISOString().split('T')[0];
  //     }
  
  //     const fields = Object.keys(updateData);
  //     const values = Object.values(updateData);
  //     const setClause = fields.map(field => `${field} = ?`).join(', ');
  
  //     await pool.execute(
  //       `UPDATE invoices SET ${setClause} WHERE id = ?`,
  //       [...values, req.params.id]
  //     );
  
  //     await logAuditTrail('invoices', req.params.id, 'UPDATE', oldRows[0], updateData, req.user.id, req.ip);
  
  //     res.json({ message: 'Invoice status updated successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });



  import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all invoices
// export const getAllInvoices = async (req, res) => {
//   try {
//     const { status, customer_id, date_from, date_to, page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     let query = `
//       SELECT i.*, c.company_name as customer_name, c.customer_code
//       FROM invoices i
//       JOIN customers c ON i.customer_id = c.id
//       WHERE 1=1
//     `;
//     let params = [];

//     if (status) {
//       query += ' AND i.status = ?';
//       params.push(status);
//     }

//     if (customer_id) {
//       query += ' AND i.customer_id = ?';
//       params.push(customer_id);
//     }

//     if (date_from) {
//       query += ' AND i.invoice_date >= ?';
//       params.push(date_from);
//     }

//     if (date_to) {
//       query += ' AND i.invoice_date <= ?';
//       params.push(date_to);
//     }

//     query += ' ORDER BY i.invoice_date DESC LIMIT ? OFFSET ?';
//     params.push(parseInt(limit), parseInt(offset));

//     const [rows] = await pool.execute(query, params);
//     res.json({ invoices: rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
export const getAllInvoices = async (req, res) => {
  try {
    const query = `
      SELECT i.*, c.company_name as customer_name, c.customer_code
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      ORDER BY i.invoice_date DESC
    `;

    const [rows] = await pool.execute(query);
    res.json({ invoices: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get invoice by ID with items
export const getInvoiceById = async (req, res) => {
  try {
    const [invoiceRows] = await pool.execute(
      `SELECT i.*, c.company_name as customer_name, c.customer_code, c.email as customer_email
       FROM invoices i
       JOIN customers c ON i.customer_id = c.id
       WHERE i.id = ?`,
      [req.params.id]
    );

    if (invoiceRows.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const [itemRows] = await pool.execute(
      'SELECT * FROM invoice_items WHERE invoice_id = ?',
      [req.params.id]
    );

    res.json({
      invoice: invoiceRows[0],
      items: itemRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create invoice
export const createInvoice = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      invoice_number, customer_id, invoice_date, due_date, tax_rate, discount_rate,
      terms_conditions, notes, items
    } = req.body;

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const discount_amount = subtotal * (discount_rate || 0) / 100;
    const taxable_amount = subtotal - discount_amount;
    const tax_amount = taxable_amount * (tax_rate || 0) / 100;
    const total_amount = taxable_amount + tax_amount;

    const [invoiceResult] = await connection.execute(
      `INSERT INTO invoices (invoice_number, customer_id, invoice_date, due_date, subtotal,
       tax_rate, tax_amount, discount_rate, discount_amount, total_amount, balance_due,
       terms_conditions, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [invoice_number, customer_id, invoice_date, due_date, subtotal, tax_rate || 0, tax_amount,
       discount_rate || 0, discount_amount, total_amount, total_amount, terms_conditions, notes, req.user.id]
    );

    for (const item of items) {
      const item_total = item.quantity * item.unit_price * (1 - (item.discount_rate || 0) / 100);
      await connection.execute(
        'INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, discount_rate, total_price, account_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [invoiceResult.insertId, item.description, item.quantity, item.unit_price, item.discount_rate || 0, item_total, item.account_id]
      );
    }

    await connection.commit();

    await logAuditTrail('invoices', invoiceResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Invoice created successfully', invoiceId: invoiceResult.insertId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
};

// Update invoice status
export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const [oldRows] = await pool.execute('SELECT * FROM invoices WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const updateData = { status };
    if (status === 'sent') {
      updateData.sent_date = new Date().toISOString().split('T')[0];
    }

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await pool.execute(
      `UPDATE invoices SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    await logAuditTrail('invoices', req.params.id, 'UPDATE', oldRows[0], updateData, req.user.id, req.ip);

    res.json({ message: 'Invoice status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
