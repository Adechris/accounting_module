import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all budgets
export const getAllBudgets = async (req, res) => {
  try {
    let query = 'SELECT * FROM budgets';
    
    const [rows] = await pool.execute(query);
    res.json({ budgets: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create budget
export const createBudget = async (req, res) => {
  try {
    const {
      budget_name, department_id, account_id, period_start, period_end,
      budgeted_amount, actual_amount, status
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO budgets (budget_name, department_id, account_id, period_start, period_end,
       budgeted_amount, actual_amount, status, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [budget_name, department_id, account_id, period_start, period_end,
       budgeted_amount, actual_amount, status, req.user.id]
    );

    await logAuditTrail('budgets', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
    res.status(201).json({ message: 'Budget created successfully', budgetId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update budget
export const updateBudget = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM budgets WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await pool.execute(
      `UPDATE budgets SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    await logAuditTrail('budgets', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
    res.json({ message: 'Budget updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete budget
export const deleteBudget = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM budgets WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await pool.execute('DELETE FROM budgets WHERE id = ?', [req.params.id]);
    await logAuditTrail('budgets', req.params.id, 'DELETE', oldRows[0], null, req.user.id, req.ip);
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get budget by ID
export const getBudgetById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM budgets WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json({ budget: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};