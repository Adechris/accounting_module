




  
  // // =============================================================================
  // // BILL ROUTES
  // // =============================================================================
  
  // // Get all bills
  // app.get('/api/bills', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   try {
  //     const { status, supplier_id, date_from, date_to, page = 1, limit = 10 } = req.query;
  //     const offset = (page - 1) * limit;
  
  //     let query = `
  //       SELECT b.*, s.company_name as supplier_name, s.supplier_code
  //       FROM bills b 
  //       JOIN suppliers s ON b.supplier_id = s.id 
  //       WHERE 1=1
  //     `;
  //     let params = [];
  
  //     if (status) {
  //       query += ' AND b.status = ?';
  //       params.push(status);
  //     }
  
  //     if (supplier_id) {
  //       query += ' AND b.supplier_id = ?';
  //       params.push(supplier_id);
  //     }
  
  //     if (date_from) {
  //       query += ' AND b.bill_date >= ?';
  //       params.push(date_from);
  //     }
  
  //     if (date_to) {
  //       query += ' AND b.bill_date <= ?';
  //       params.push(date_to);
  //     }
  
  //     query += ' ORDER BY b.bill_date DESC LIMIT ? OFFSET ?';
  //     params.push(parseInt(limit), parseInt(offset));
  
  //     const [rows] = await pool.execute(query, params);
  //     res.json({ bills: rows });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });
  
  // // Get bill by ID with items
  // app.get('/api/bills/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   try {
  //     const [billRows] = await pool.execute(
  //       `SELECT b.*, s.company_name as supplier_name, s.supplier_code
  //        FROM bills b 
  //        JOIN suppliers s ON b.supplier_id = s.id 
  //        WHERE b.id = ?`,
  //       [req.params.id]
  //     );
  
  //     if (billRows.length === 0) {
  //       return res.status(404).json({ message: 'Bill not found' });
  //     }
  
  //     const [itemRows] = await pool.execute(
  //       'SELECT * FROM bill_items WHERE bill_id = ?',
  //       [req.params.id]
  //     );
  
  //     res.json({
  //       bill: billRows[0],
  //       items: itemRows
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });
  
  // // Create bill
  // app.post('/api/bills', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   const connection = await pool.getConnection();
  //   try {
  //     await connection.beginTransaction();
  
  //     const {
  //       bill_number, supplier_id, bill_date, due_date, po_number, tax_rate,
  //       notes, items
  //     } = req.body;
  
  //     // Calculate totals
  //     const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  //     const tax_amount = subtotal * (tax_rate || 0) / 100;
  //     const total_amount = subtotal + tax_amount;
  
  //     // Insert bill
  //     const [billResult] = await connection.execute(
  //       `INSERT INTO bills (bill_number, supplier_id, bill_date, due_date, po_number, subtotal, 
  //        tax_rate, tax_amount, total_amount, balance_due, notes, created_by) 
  //        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  //       [bill_number, supplier_id, bill_date, due_date, po_number, subtotal, 
  //        tax_rate || 0, tax_amount, total_amount, total_amount, notes, req.user.id]
  //     );
  
  //     // Insert bill items
  //     for (const item of items) {
  //       const item_total = item.quantity * item.unit_price;
  //       await connection.execute(
  //         'INSERT INTO bill_items (bill_id, description, quantity, unit_price, total_price, account_id) VALUES (?, ?, ?, ?, ?, ?)',
  //         [billResult.insertId, item.description, item.quantity, item.unit_price, item_total, item.account_id]
  //       );
  //     }
  
  //     await connection.commit();
  
  //     await logAuditTrail('bills', billResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
  //     res.status(201).json({ message: 'Bill created successfully', billId: billResult.insertId });
  //   } catch (error) {
  //     await connection.rollback();
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   } finally {
  //     connection.release();
  //   }
  // });
  
  // // Approve bill
  // app.put('/api/bills/:id/approve', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
  //   try {
  //     const [oldRows] = await pool.execute('SELECT * FROM bills WHERE id = ? AND status = ?', [req.params.id, 'pending_approval']);
      
  //     if (oldRows.length === 0) {
  //       return res.status(404).json({ message: 'Bill not found or not pending approval' });
  //     }
  
  //     await pool.execute(
  //       'UPDATE bills SET status = ?, approved_by = ? WHERE id = ?',
  //       ['approved', req.user.id, req.params.id]
  //     );
  
  //     await logAuditTrail('bills', req.params.id, 'UPDATE', oldRows[0], { status: 'approved', approved_by: req.user.id }, req.user.id, req.ip);
  
  //     res.json({ message: 'Bill approved successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });



  import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all bills
// export const getAllBills = async (req, res) => {
//   try {
//     const { status, supplier_id, date_from, date_to, page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     let query = `
//       SELECT b.*, s.company_name as supplier_name, s.supplier_code
//       FROM bills b
//       JOIN suppliers s ON b.supplier_id = s.id
//       WHERE 1=1
//     `;
//     let params = [];

//     if (status) {
//       query += ' AND b.status = ?';
//       params.push(status);
//     }

//     if (supplier_id) {
//       query += ' AND b.supplier_id = ?';
//       params.push(supplier_id);
//     }

//     if (date_from) {
//       query += ' AND b.bill_date >= ?';
//       params.push(date_from);
//     }

//     if (date_to) {
//       query += ' AND b.bill_date <= ?';
//       params.push(date_to);
//     }

//     query += ' ORDER BY b.bill_date DESC LIMIT ? OFFSET ?';
//     params.push(parseInt(limit), parseInt(offset));

//     const [rows] = await pool.execute(query, params);
//     res.json({ bills: rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

export const getAllBills = async (req, res) => {
  try {
    const query = `
      SELECT b.*, s.company_name as supplier_name, s.supplier_code
      FROM bills b
      JOIN suppliers s ON b.supplier_id = s.id
      ORDER BY b.bill_date DESC
    `;

    const [rows] = await pool.execute(query); // no parameters
    res.json({ bills: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get bill by ID with items
export const getBillById = async (req, res) => {
  try {
    const [billRows] = await pool.execute(
      `SELECT b.*, s.company_name as supplier_name, s.supplier_code
       FROM bills b
       JOIN suppliers s ON b.supplier_id = s.id
       WHERE b.id = ?`,
      [req.params.id]
    );

    if (billRows.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const [itemRows] = await pool.execute(
      'SELECT * FROM bill_items WHERE bill_id = ?',
      [req.params.id]
    );

    res.json({
      bill: billRows[0],
      items: itemRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create bill
export const createBill = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      bill_number, supplier_id, bill_date, due_date, po_number, tax_rate,
      notes, items
    } = req.body;

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const tax_amount = subtotal * (tax_rate || 0) / 100;
    const total_amount = subtotal + tax_amount;

    const [billResult] = await connection.execute(
      `INSERT INTO bills (bill_number, supplier_id, bill_date, due_date, po_number, subtotal,
       tax_rate, tax_amount, total_amount, balance_due, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [bill_number, supplier_id, bill_date, due_date, po_number, subtotal,
       tax_rate || 0, tax_amount, total_amount, total_amount, notes, req.user.id]
    );

    for (const item of items) {
      const item_total = item.quantity * item.unit_price;
      await connection.execute(
        'INSERT INTO bill_items (bill_id, description, quantity, unit_price, total_price, account_id) VALUES (?, ?, ?, ?, ?, ?)',
        [billResult.insertId, item.description, item.quantity, item.unit_price, item_total, item.account_id]
      );
    }

    await connection.commit();

    await logAuditTrail('bills', billResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Bill created successfully', billId: billResult.insertId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
};

// Approve bill
// export const approveBill = async (req, res) => {
//   try {
//     const [oldRows] = await pool.execute('SELECT * FROM bills WHERE id = ? AND status = ?', [req.params.id, 'pending_approval']);

//     if (oldRows.length === 0) {
//       return res.status(404).json({ message: 'Bill not found or not pending approval' });
//     }

//     await pool.execute(
//       'UPDATE bills SET status = ?, approved_by = ? WHERE id = ?',
//       ['approved', req.user.id, req.params.id]
//     );

//     await logAuditTrail('bills', req.params.id, 'UPDATE', oldRows[0], { status: 'approved', approved_by: req.user.id }, req.user.id, req.ip);

//     res.json({ message: 'Bill approved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
export const approveBill = async (req, res) => {
  console.log('Approving bill with ID:', req.params.id);
  console.log('User ID:', req.user.id);
  
  try {
    // Validate bill ID
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(400).json({ message: 'Invalid bill ID' });
    }

    // Fetch the bill to verify it's pending approval
    const [oldRows] = await pool.execute(
      'SELECT * FROM bills WHERE id = ? AND status = ?',
      [req.params.id, 'pending_approval']
    );

    if (oldRows.length === 0) {
      return res.status(404).json({ 
        message: 'Bill not found or not pending approval',
        billId: req.params.id 
      });
    }

    console.log('Found bill for approval:', oldRows[0]);

    // Approve the bill
    const [updateResult] = await pool.execute(
      'UPDATE bills SET status = ?, approved_by = ?, approved_at = NOW() WHERE id = ?',
      ['approved', req.user.id, req.params.id]
    );

    console.log('Update result:', updateResult);

    if (updateResult.affectedRows === 0) {
      return res.status(500).json({ message: 'Failed to update bill status' });
    }

    // Log audit trail
    await logAuditTrail(
      'bills',
      req.params.id,
      'UPDATE',
      oldRows[0],
      { status: 'approved', approved_by: req.user.id, approved_at: new Date() },
      req.user.id,
      req.ip
    );

    // Refetch the updated bill to send it back
    const [updatedRows] = await pool.execute(
      'SELECT b.*, s.company_name as supplier_name FROM bills b JOIN suppliers s ON b.supplier_id = s.id WHERE b.id = ?',
      [req.params.id]
    );

    if (updatedRows.length === 0) {
      return res.status(500).json({ message: 'Error fetching updated bill' });
    }

    console.log('Bill approved successfully:', updatedRows[0]);

    // Return the updated bill
    res.json({ 
      bill: updatedRows[0], 
      message: 'Bill approved successfully',
      success: true 
    });

  } catch (error) {
    console.error('Error in approveBill:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      success: false 
    });
  }
};
