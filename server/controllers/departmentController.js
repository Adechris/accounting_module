
import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all departments
export const getAllDepartments = async (req, res) => {
    try {
      let query = 'SELECT * FROM departments';
      
      const [rows] = await pool.execute(query);
      res.json({ departments: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Create department
  // export const createDepartment = async (req, res) => {
  //   try {
  //     const {
  //       department_name, department_code, manager_id, status
  //     } = req.body;
  
  //     const [result] = await pool.execute(
  //       `INSERT INTO departments (department_name, department_code, manager_id, status)
  //        VALUES (?, ?, ?, ?)`,
  //       [department_name, department_code, manager_id, status]
  //     );
  
  //     await logAuditTrail('departments', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  //     res.status(201).json({ message: 'Department created successfully', departmentId: result.insertId });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // };
  export const createDepartment = async (req, res) => {
    try {
      const {
        department_name, department_code, manager_id, status
      } = req.body;
  
      // Check if the manager_id exists in the users table
      const [managerCheck] = await pool.execute(
        'SELECT id FROM users WHERE id = ?',
        [manager_id]
      );
  
      if (managerCheck.length === 0) {
        return res.status(400).json({ message: 'Invalid manager ID' });
      }
  
      // Insert the new department
      const [result] = await pool.execute(
        `INSERT INTO departments (department_name, department_code, manager_id, status)
         VALUES (?, ?, ?, ?)`,
        [department_name, department_code, manager_id, status]
      );
  
      await logAuditTrail('departments', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
      res.status(201).json({ message: 'Department created successfully', departmentId: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  // Update department
  export const updateDepartment = async (req, res) => {
    try {
      const [oldRows] = await pool.execute('SELECT * FROM departments WHERE id = ?', [req.params.id]);
      if (oldRows.length === 0) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const setClause = fields.map(field => `${field} = ?`).join(', ');
  
      await pool.execute(
        `UPDATE departments SET ${setClause} WHERE id = ?`,
        [...values, req.params.id]
      );
  
      await logAuditTrail('departments', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
      res.json({ message: 'Department updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Delete department
  export const deleteDepartment = async (req, res) => {
    try {
      const [oldRows] = await pool.execute('SELECT * FROM departments WHERE id = ?', [req.params.id]);
      if (oldRows.length === 0) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      await pool.execute('DELETE FROM departments WHERE id = ?', [req.params.id]);
      await logAuditTrail('departments', req.params.id, 'DELETE', oldRows[0], null, req.user.id, req.ip);
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Get department by ID
  export const getDepartmentById = async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM departments WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.json({ department: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };