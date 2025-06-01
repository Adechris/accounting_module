// // =============================================================================
// // CHART OF ACCOUNTS ROUTES
// // =============================================================================

// // Get all accounts
// app.get('/api/accounts', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const { account_type, is_active } = req.query;
  
//       let query = 'SELECT * FROM chart_of_accounts WHERE 1=1';
//       let params = [];
  
//       if (account_type) {
//         query += ' AND account_type = ?';
//         params.push(account_type);
//       }
  
//       if (is_active !== undefined) {
//         query += ' AND is_active = ?';
//         params.push(is_active === 'true');
//       }
  
//       query += ' ORDER BY account_code';
  
//       const [rows] = await pool.execute(query, params);
//       res.json(rows);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create new account
//   app.post('/api/accounts', authenticateToken, authorizeRoles('admin', 'accountant'), async (req, res) => {
//     try {
//       const { account_code, account_name, account_type, account_subtype, parent_id, description } = req.body;
  
//       const [result] = await pool.execute(
//         'INSERT INTO chart_of_accounts (account_code, account_name, account_type, account_subtype, parent_id, description) VALUES (?, ?, ?, ?, ?, ?)',
//         [account_code, account_name, account_type, account_subtype, parent_id, description]
//       );
  
//       await logAuditTrail('chart_of_accounts', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Account created successfully', accountId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Update account
//   app.put('/api/accounts/:id', authenticateToken, authorizeRoles('admin', 'accountant'), async (req, res) => {
//     try {
//       const [oldRows] = await pool.execute('SELECT * FROM chart_of_accounts WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Account not found' });
//       }
  
//       const fields = Object.keys(req.body);
//       const values = Object.values(req.body);
//       const setClause = fields.map(field => `${field} = ?`).join(', ');
  
//       await pool.execute(
//         `UPDATE chart_of_accounts SET ${setClause} WHERE id = ?`,
//         [...values, req.params.id]
//       );
  
//       await logAuditTrail('chart_of_accounts', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
  
//       res.json({ message: 'Account updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });











import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all accounts
export const getAllAccounts = async (req, res) => {
  try {
    const { account_type, is_active } = req.query;

    let query = 'SELECT * FROM chart_of_accounts WHERE 1=1';
    let params = [];

    if (account_type) {
      query += ' AND account_type = ?';
      params.push(account_type);
    }

    if (is_active !== undefined) {
      query += ' AND is_active = ?';
      params.push(is_active === 'true');
    }

    query += ' ORDER BY account_code';

    const [rows] = await pool.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new account
export const createAccount = async (req, res) => {
  try {
    const { account_code, account_name, account_type, account_subtype, parent_id, description } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO chart_of_accounts (account_code, account_name, account_type, account_subtype, parent_id, description) VALUES (?, ?, ?, ?, ?, ?)',
      [account_code, account_name, account_type, account_subtype, parent_id, description]
    );

    await logAuditTrail('chart_of_accounts', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Account created successfully', accountId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update account
export const updateAccount = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM chart_of_accounts WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await pool.execute(
      `UPDATE chart_of_accounts SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    await logAuditTrail('chart_of_accounts', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);

    res.json({ message: 'Account updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
