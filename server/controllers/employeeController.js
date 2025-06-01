// // =============================================================================
// // EMPLOYEE ROUTES
// // =============================================================================

// // Get all employees
// app.get('/api/employees', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), async (req, res) => {
//     try {
//       const { page = 1, limit = 10, status, department } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = 'SELECT * FROM employees WHERE 1=1';
//       let params = [];
  
//       if (status) {
//         query += ' AND status = ?';
//         params.push(status);
//       }
  
//       if (department) {
//         query += ' AND department = ?';
//         params.push(department);
//       }
  
//       query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       const [countResult] = await pool.execute('SELECT COUNT(*) as total FROM employees WHERE 1=1' + (status ? ' AND status = ?' : '') + (department ? ' AND department = ?' : ''), params.slice(0, -2));
  
//       res.json({
//         employees: rows,
//         total: countResult[0].total,
//         page: parseInt(page),
//         totalPages: Math.ceil(countResult[0].total / limit)
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Get employee by ID
//   app.get('/api/employees/:id', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), async (req, res) => {
//     try {
//       const [rows] = await pool.execute('SELECT * FROM employees WHERE id = ?', [req.params.id]);
      
//       if (rows.length === 0) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
  
//       res.json(rows[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create new employee
//   app.post('/api/employees', authenticateToken, authorizeRoles('admin', 'hr'), async (req, res) => {
//     try {
//       const {
//         employee_id, first_name, last_name, email, phone, address, city, state, postal_code,
//         country, department, position, salary, hourly_rate, hire_date, employment_type,
//         emergency_contact_name, emergency_contact_phone
//       } = req.body;
  
//       const [result] = await pool.execute(
//         `INSERT INTO employees (employee_id, first_name, last_name, email, phone, address, city, state, 
//          postal_code, country, department, position, salary, hourly_rate, hire_date, employment_type, 
//          emergency_contact_name, emergency_contact_phone) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [employee_id, first_name, last_name, email, phone, address, city, state, postal_code,
//          country, department, position, salary, hourly_rate, hire_date, employment_type,
//          emergency_contact_name, emergency_contact_phone]
//       );
  
//       await logAuditTrail('employees', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Employee created successfully', employeeId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Update employee
//   app.put('/api/employees/:id', authenticateToken, authorizeRoles('admin', 'hr'), async (req, res) => {
//     try {
//       // Get old values for audit
//       const [oldRows] = await pool.execute('SELECT * FROM employees WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
  
//       const fields = Object.keys(req.body);
//       const values = Object.values(req.body);
//       const setClause = fields.map(field => `${field} = ?`).join(', ');
  
//       await pool.execute(
//         `UPDATE employees SET ${setClause} WHERE id = ?`,
//         [...values, req.params.id]
//       );
  
//       await logAuditTrail('employees', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
  
//       res.json({ message: 'Employee updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Delete employee (Soft delete - set status to terminated)
//   app.delete('/api/employees/:id', authenticateToken, authorizeRoles('admin', 'hr'), async (req, res) => {
//     try {
//       const [oldRows] = await pool.execute('SELECT * FROM employees WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Employee not found' });
//       }
  
//       await pool.execute(
//         'UPDATE employees SET status = ?, termination_date = CURDATE() WHERE id = ?',
//         ['terminated', req.params.id]
//       );
  
//       await logAuditTrail('employees', req.params.id, 'UPDATE', oldRows[0], { status: 'terminated', termination_date: new Date().toISOString().split('T')[0] }, req.user.id, req.ip);
  
//       res.json({ message: 'Employee terminated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });














import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all employees
// export const getAllEmployees = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const offset = (page - 1) * limit;
//     const { status, department } = req.query;

//     let query = 'SELECT * FROM employees WHERE 1=1';
//     const params = [];

//     if (status) {
//       query += ' AND status = ?';
//       params.push(status);
//     }

//     if (department) {
//       query += ' AND department = ?';
//       params.push(department);
//     }

//     query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
//     params.push(limit, offset); // Now both are guaranteed to be numbers

//     const [rows] = await pool.execute(query, params);

//     const countParams = [];
//     let countQuery = 'SELECT COUNT(*) as total FROM employees WHERE 1=1';
//     if (status) {
//       countQuery += ' AND status = ?';
//       countParams.push(status);
//     }
//     if (department) {
//       countQuery += ' AND department = ?';
//       countParams.push(department);
//     }

//     const [countResult] = await pool.execute(countQuery, countParams);

//     res.json({
//       employees: rows,
//       total: countResult[0].total,
//       page,
//       totalPages: Math.ceil(countResult[0].total / limit),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
export const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM employees ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM employees WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new employee
// export const createEmployee = async (req, res) => {
//   try {
//     const {
//       employee_id, first_name, last_name, email, phone, address, city, state, postal_code,
//       country, department, position, salary, hourly_rate, hire_date, employment_type,
//       emergency_contact_name, emergency_contact_phone
//     } = req.body;

//     const [result] = await pool.execute(
//       `INSERT INTO employees (employee_id, first_name, last_name, email, phone, address, city, state,
//        postal_code, country, department, position, salary, hourly_rate, hire_date, employment_type,
//        emergency_contact_name, emergency_contact_phone)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [employee_id, first_name, last_name, email, phone, address, city, state, postal_code,
//        country, department, position, salary, hourly_rate, hire_date, employment_type,
//        emergency_contact_name, emergency_contact_phone]
//     );

//     await logAuditTrail('employees', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

//     res.status(201).json({ message: 'Employee created successfully', employeeId: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

export async function generateEmployeeID() {
  const [rows] = await pool.execute(
    `SELECT employee_id FROM employees ORDER BY id DESC LIMIT 1`
  );

  if (rows.length === 0) {
    return 'EMP001';
  }

  const lastID = rows[0].employee_id;
  const number = parseInt(lastID.replace('EMP', '')) + 1;
  return 'EMP' + number.toString().padStart(3, '0');
}


export async function createEmployee(req, res) {
  try {
    const {
      first_name, last_name, email, phone, address, city, state,
      postal_code, country = 'USA', department, position, salary,
      hourly_rate, hire_date, employment_type = 'full_time',
      emergency_contact_name, emergency_contact_phone
    } = req.body;

    const employee_id = await generateEmployeeID();

    const [result] = await pool.execute(
      `INSERT INTO employees (
        employee_id, first_name, last_name, email, phone, address, city, state,
        postal_code, country, department, position, salary, hourly_rate, hire_date, termination_date,
        employment_type, status, emergency_contact_name, emergency_contact_phone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employee_id, first_name, last_name, email, phone, address, city, state,
        postal_code, country, department, position, salary, hourly_rate, hire_date, null,
        employment_type, 'active', emergency_contact_name, emergency_contact_phone
      ]
    );

    res.status(201).json({ message: 'Employee created successfully', employee_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating employee' });
  }
}





// Update employee
export const updateEmployee = async (req, res) => {
  try {
    // Get old values for audit
    const [oldRows] = await pool.execute('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await pool.execute(
      `UPDATE employees SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    await logAuditTrail('employees', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);

    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete employee (Soft delete - set status to terminated)
export const deleteEmployee = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await pool.execute(
      'UPDATE employees SET status = ?, termination_date = CURDATE() WHERE id = ?',
      ['terminated', req.params.id]
    );

    await logAuditTrail('employees', req.params.id, 'UPDATE', oldRows[0], { status: 'terminated', termination_date: new Date().toISOString().split('T')[0] }, req.user.id, req.ip);

    res.json({ message: 'Employee terminated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
