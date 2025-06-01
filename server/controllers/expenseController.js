

  
//   // =============================================================================
//   // EXPENSE ROUTES
//   // =============================================================================
  
//   // Get all expenses
//   app.get('/api/expenses', authenticateToken, async (req, res) => {
//     try {
//       const { category, employee_id, status, date_from, date_to, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = `
//         SELECT e.*, emp.first_name, emp.last_name, coa.account_name
//         FROM expenses e 
//         LEFT JOIN employees emp ON e.employee_id = emp.id
//         JOIN chart_of_accounts coa ON e.account_id = coa.id
//         WHERE 1=1
//       `;
//       let params = [];
  
//       // Role-based filtering
//       if (req.user.role === 'employee' && req.user.employee_id) {
//         query += ' AND e.employee_id = ?';
//         params.push(req.user.employee_id);
//       } else if (employee_id) {
//         query += ' AND e.employee_id = ?';
//         params.push(employee_id);
//       }
  
//       if (category) {
//         query += ' AND e.category = ?';
//         params.push(category);
//       }
  
//       if (status) {
//         query += ' AND e.status = ?';
//         params.push(status);
//       }
  
//       if (date_from) {
//         query += ' AND e.expense_date >= ?';
//         params.push(date_from);
//       }
  
//       if (date_to) {
//         query += ' AND e.expense_date <= ?';
//         params.push(date_to);
//       }
  
//       query += ' ORDER BY e.expense_date DESC LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       res.json({ expenses: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create expense
//   app.post('/api/expenses', authenticateToken, async (req, res) => {
//     try {
//       const {
//         expense_number, category, subcategory, description, amount, expense_date,
//         payment_method, receipt_number, employee_id, account_id, supplier_id,
//         project_id, is_reimbursable
//       } = req.body;
  
//       // For employees, set their own employee_id
//       const final_employee_id = req.user.role === 'employee' ? req.user.employee_id : employee_id;
  
//       const [result] = await pool.execute(
//         `INSERT INTO expenses (expense_number, category, subcategory, description, amount, expense_date,
//          payment_method, receipt_number, employee_id, account_id, supplier_id, project_id, 
//          is_reimbursable, created_by) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [expense_number, category, subcategory, description, amount, expense_date,
//          payment_method, receipt_number, final_employee_id, account_id, supplier_id, project_id,
//          is_reimbursable, req.user.id]
//       );
  
//       await logAuditTrail('expenses', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Expense created successfully', expenseId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Approve/Reject expense
//   app.put('/api/expenses/:id/approve', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const { status } = req.body; // 'approved' or 'rejected'
      
//       const [oldRows] = await pool.execute('SELECT * FROM expenses WHERE id = ? AND status = ?', [req.params.id, 'submitted']);
      
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Expense not found or not submitted for approval' });
//       }
  
//       await pool.execute(
//         'UPDATE expenses SET status = ?, approved_by = ? WHERE id = ?',
//         [status, req.user.id, req.params.id]
//       );
  
//       await logAuditTrail('expenses', req.params.id, 'UPDATE', oldRows[0], { status, approved_by: req.user.id }, req.user.id, req.ip);
  
//       res.json({ message: `Expense ${status} successfully` });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });



import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all expenses
export const getAllExpenses = async (req, res) => {
  try {
    const { category, employee_id, status, date_from, date_to, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT e.*, emp.first_name, emp.last_name, coa.account_name
      FROM expenses e
      LEFT JOIN employees emp ON e.employee_id = emp.id
      JOIN chart_of_accounts coa ON e.account_id = coa.id
      WHERE 1=1
    `;
    let params = [];

    if (req.user.role === 'employee' && req.user.employee_id) {
      query += ' AND e.employee_id = ?';
      params.push(req.user.employee_id);
    } else if (employee_id) {
      query += ' AND e.employee_id = ?';
      params.push(employee_id);
    }

    if (category) {
      query += ' AND e.category = ?';
      params.push(category);
    }

    if (status) {
      query += ' AND e.status = ?';
      params.push(status);
    }

    if (date_from) {
      query += ' AND e.expense_date >= ?';
      params.push(date_from);
    }

    if (date_to) {
      query += ' AND e.expense_date <= ?';
      params.push(date_to);
    }

    query += ' ORDER BY e.expense_date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, params);
    res.json({ expenses: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create expense
export const createExpense = async (req, res) => {
  try {
    const {
      expense_number, category, subcategory, description, amount, expense_date,
      payment_method, receipt_number, employee_id, account_id, supplier_id,
      project_id, is_reimbursable
    } = req.body;

    const final_employee_id = req.user.role === 'employee' ? req.user.employee_id : employee_id;

    const [result] = await pool.execute(
      `INSERT INTO expenses (expense_number, category, subcategory, description, amount, expense_date,
       payment_method, receipt_number, employee_id, account_id, supplier_id, project_id,
       is_reimbursable, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [expense_number, category, subcategory, description, amount, expense_date,
       payment_method, receipt_number, final_employee_id, account_id, supplier_id, project_id,
       is_reimbursable, req.user.id]
    );

    await logAuditTrail('expenses', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Expense created successfully', expenseId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve/Reject expense
export const approveRejectExpense = async (req, res) => {
  try {
    const { status } = req.body;

    const [oldRows] = await pool.execute('SELECT * FROM expenses WHERE id = ? AND status = ?', [req.params.id, 'submitted']);

    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Expense not found or not submitted for approval' });
    }

    await pool.execute(
      'UPDATE expenses SET status = ?, approved_by = ? WHERE id = ?',
      [status, req.user.id, req.params.id]
    );

    await logAuditTrail('expenses', req.params.id, 'UPDATE', oldRows[0], { status, approved_by: req.user.id }, req.user.id, req.ip);

    res.json({ message: `Expense ${status} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
