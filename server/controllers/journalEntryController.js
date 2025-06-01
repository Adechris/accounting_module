// // =============================================================================
// // JOURNAL ENTRIES ROUTES
// // =============================================================================

// // Get journal entries
// app.get('/api/journal-entries', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const { status, date_from, date_to, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = `
//         SELECT je.*, u.username as created_by_name 
//         FROM journal_entries je 
//         JOIN users u ON je.created_by = u.id 
//         WHERE 1=1
//       `;
//       let params = [];
  
//       if (status) {
//         query += ' AND je.status = ?';
//         params.push(status);
//       }
  
//       if (date_from) {
//         query += ' AND je.entry_date >= ?';
//         params.push(date_from);
//       }
  
//       if (date_to) {
//         query += ' AND je.entry_date <= ?';
//         params.push(date_to);
//       }
  
//       query += ' ORDER BY je.entry_date DESC, je.created_at DESC LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       res.json({ journal_entries: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Get journal entry details
//   app.get('/api/journal-entries/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const [entryRows] = await pool.execute(
//         'SELECT * FROM journal_entries WHERE id = ?',
//         [req.params.id]
//       );
  
//       if (entryRows.length === 0) {
//         return res.status(404).json({ message: 'Journal entry not found' });
//       }
  
//       const [detailRows] = await pool.execute(
//         `SELECT jed.*, coa.account_name, coa.account_code 
//          FROM journal_entry_details jed 
//          JOIN chart_of_accounts coa ON jed.account_id = coa.id 
//          WHERE jed.journal_entry_id = ?`,
//         [req.params.id]
//       );
  
//       res.json({
//         journal_entry: entryRows[0],
//         details: detailRows
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create journal entry
//   app.post('/api/journal-entries', authenticateToken, authorizeRoles('admin', 'accountant'), async (req, res) => {
//     const connection = await pool.getConnection();
//     try {
//       await connection.beginTransaction();
  
//       const { entry_number, entry_date, description, reference, details } = req.body;
  
//       // Calculate totals
//       const total_debit = details.reduce((sum, detail) => sum + parseFloat(detail.debit_amount || 0), 0);
//       const total_credit = details.reduce((sum, detail) => sum + parseFloat(detail.credit_amount || 0), 0);
  
//       // Validate that debits equal credits
//       if (Math.abs(total_debit - total_credit) > 0.01) {
//         throw new Error('Debits must equal credits');
//       }
  
//       // Insert journal entry
//       const [entryResult] = await connection.execute(
//         'INSERT INTO journal_entries (entry_number, entry_date, description, reference, total_debit, total_credit, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
//         [entry_number, entry_date, description, reference, total_debit, total_credit, req.user.id]
//       );
  
//       // Insert journal entry details
//       for (const detail of details) {
//         await connection.execute(
//           'INSERT INTO journal_entry_details (journal_entry_id, account_id, description, debit_amount, credit_amount) VALUES (?, ?, ?, ?, ?)',
//           [entryResult.insertId, detail.account_id, detail.description, detail.debit_amount || 0, detail.credit_amount || 0]
//         );
//       }
  
//       await connection.commit();
  
//       await logAuditTrail('journal_entries', entryResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Journal entry created successfully', journalEntryId: entryResult.insertId });
//     } catch (error) {
//       await connection.rollback();
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     } finally {
//       connection.release();
//     }
//   });
  
//   // Post journal entry
//   app.put('/api/journal-entries/:id/post', authenticateToken, authorizeRoles('admin', 'accountant'), async (req, res) => {
//     try {
//       const [rows] = await pool.execute('SELECT * FROM journal_entries WHERE id = ? AND status = ?', [req.params.id, 'draft']);
      
//       if (rows.length === 0) {
//         return res.status(404).json({ message: 'Journal entry not found or already posted' });
//       }
  
//       await pool.execute(
//         'UPDATE journal_entries SET status = ?, posted_date = CURDATE(), approved_by = ? WHERE id = ?',
//         ['posted', req.user.id, req.params.id]
//       );
  
//       await logAuditTrail('journal_entries', req.params.id, 'UPDATE', rows[0], { status: 'posted', posted_date: new Date(), approved_by: req.user.id }, req.user.id, req.ip);
  
//       res.json({ message: 'Journal entry posted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });


















import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get journal entries
// export const getJournalEntries = async (req, res) => {
//   try {
//     const { status, date_from, date_to, page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     let query = `
//       SELECT je.*, u.username as created_by_name
//       FROM journal_entries je
//       JOIN users u ON je.created_by = u.id
//       WHERE 1=1
//     `;
//     let params = [];

//     if (status) {
//       query += ' AND je.status = ?';
//       params.push(status);
//     }

//     if (date_from) {
//       query += ' AND je.entry_date >= ?';
//       params.push(date_from);
//     }

//     if (date_to) {
//       query += ' AND je.entry_date <= ?';
//       params.push(date_to);
//     }

//     query += ' ORDER BY je.entry_date DESC, je.created_at DESC LIMIT ? OFFSET ?';
//     params.push(parseInt(limit), parseInt(offset));

//     const [rows] = await pool.execute(query, params);
//     res.json({ journal_entries: rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
export const getJournalEntries = async (req, res) => {
  try {
    const { status, date_from, date_to } = req.query;

    let baseQuery = `
      SELECT je.*, u.username as created_by_name
      FROM journal_entries je
      JOIN users u ON je.created_by = u.id
    `;

    let conditions = [];
    let params = [];

    if (status) {
      conditions.push('je.status = ?');
      params.push(status);
    }

    if (date_from) {
      conditions.push('je.entry_date >= ?');
      params.push(date_from);
    }

    if (date_to) {
      conditions.push('je.entry_date <= ?');
      params.push(date_to);
    }

    // Add WHERE only if conditions exist
    if (conditions.length > 0) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    baseQuery += ' ORDER BY je.entry_date DESC, je.created_at DESC';

    // console.log('Query:', baseQuery);
    // console.log('Params:', params);

    const [rows] = params.length > 0
      ? await pool.execute(baseQuery, params)
      : await pool.query(baseQuery);

    res.json({ journal_entries: rows });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Get journal entry details
export const getJournalEntryDetails = async (req, res) => {
  try {
    const [entryRows] = await pool.execute(
      'SELECT * FROM journal_entries WHERE id = ?',
      [req.params.id]
    );

    if (entryRows.length === 0) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    const [detailRows] = await pool.execute(
      `SELECT jed.*, coa.account_name, coa.account_code
       FROM journal_entry_details jed
       JOIN chart_of_accounts coa ON jed.account_id = coa.id
       WHERE jed.journal_entry_id = ?`,
      [req.params.id]
    );

    res.json({
      journal_entry: entryRows[0],
      details: detailRows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create journal entry
export const createJournalEntry = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { entry_number, entry_date, description, reference, details } = req.body;

    const total_debit = details.reduce((sum, detail) => sum + parseFloat(detail.debit_amount || 0), 0);
    const total_credit = details.reduce((sum, detail) => sum + parseFloat(detail.credit_amount || 0), 0);

    if (Math.abs(total_debit - total_credit) > 0.01) {
      throw new Error('Debits must equal credits');
    }

    const [entryResult] = await connection.execute(
      'INSERT INTO journal_entries (entry_number, entry_date, description, reference, total_debit, total_credit, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [entry_number, entry_date, description, reference, total_debit, total_credit, req.user.id]
    );

    for (const detail of details) {
      await connection.execute(
        'INSERT INTO journal_entry_details (journal_entry_id, account_id, description, debit_amount, credit_amount) VALUES (?, ?, ?, ?, ?)',
        [entryResult.insertId, detail.account_id, detail.description, detail.debit_amount || 0, detail.credit_amount || 0]
      );
    }

    await connection.commit();

    await logAuditTrail('journal_entries', entryResult.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Journal entry created successfully', journalEntryId: entryResult.insertId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    connection.release();
  }
};

// Post journal entry
export const postJournalEntry = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM journal_entries WHERE id = ? AND status = ?', [req.params.id, 'draft']);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Journal entry not found or already posted' });
    }

    await pool.execute(
      'UPDATE journal_entries SET status = ?, posted_date = CURDATE(), approved_by = ? WHERE id = ?',
      ['posted', req.user.id, req.params.id]
    );

    await logAuditTrail('journal_entries', req.params.id, 'UPDATE', rows[0], { status: 'posted', posted_date: new Date(), approved_by: req.user.id }, req.user.id, req.ip);

    res.json({ message: 'Journal entry posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
