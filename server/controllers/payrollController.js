 
//   // =============================================================================
//   // PAYROLL ROUTES
//   // =============================================================================
  
//   // Get payroll records
//   app.get('/api/payroll', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), async (req, res) => {
//     try {
//       const { employee_id, status, pay_period_start, pay_period_end, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = `
//         SELECT p.*, e.first_name, e.last_name, e.employee_id as emp_code
//         FROM payroll p 
//         JOIN employees e ON p.employee_id = e.id 
//         WHERE 1=1
//       `;
//       let params = [];
  
//       if (employee_id) {
//         query += ' AND p.employee_id = ?';
//         params.push(employee_id);
//       }
  
//       if (status) {
//         query += ' AND p.status = ?';
//         params.push(status);
//       }
  
//       if (pay_period_start) {
//         query += ' AND p.pay_period_start >= ?';
//         params.push(pay_period_start);
//       }
  
//       if (pay_period_end) {
//         query += ' AND p.pay_period_end <= ?';
//         params.push(pay_period_end);
//       }
  
//       query += ' ORDER BY p.pay_period_start DESC LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       res.json({ payroll: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create payroll record
//   app.post('/api/payroll', authenticateToken, authorizeRoles('admin', 'hr'), async (req, res) => {
//     try {
//       const {
//         employee_id, pay_period_start, pay_period_end, regular_hours, overtime_hours,
//         holiday_hours, sick_hours, vacation_hours, gross_pay, federal_tax, state_tax,
//         social_security, medicare, health_insurance, retirement_401k, other_deductions,
//         net_pay, payment_date, payment_method
//       } = req.body;
  
//       const [result] = await pool.execute(
//         `INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, regular_hours, overtime_hours,
//          holiday_hours, sick_hours, vacation_hours, gross_pay, federal_tax, state_tax,
//          social_security, medicare, health_insurance, retirement_401k, other_deductions,
//          net_pay, payment_date, payment_method, created_by) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [employee_id, pay_period_start, pay_period_end, regular_hours, overtime_hours,
//          holiday_hours, sick_hours, vacation_hours, gross_pay, federal_tax, state_tax,
//          social_security, medicare, health_insurance, retirement_401k, other_deductions,
//          net_pay, payment_date, payment_method, req.user.id]
//       );
  
//       await logAuditTrail('payroll', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Payroll record created successfully', payrollId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });

// // Approve payroll record
// app.put('/api/payroll/:id/approve', authenticateToken, authorizeRoles('admin', 'hr'), async (req, res) => {
//     try {
//       const [oldRows] = await pool.execute('SELECT * FROM payroll WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Payroll record not found' });
//       }
  
//       const oldRecord = oldRows[0];
  
//       // Update payroll status to approved
//       await pool.execute('UPDATE payroll SET status = "approved" WHERE id = ?', [req.params.id]);
  
//       await logAuditTrail('payroll', req.params.id, 'UPDATE', oldRecord, { status: 'approved' }, req.user.id, req.ip);
  
//       res.json({ message: 'Payroll record approved successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });

// // Mark payroll as paid
// app.put('/api/payroll/:id/mark-paid', authenticateToken, authorizeRoles('admin', 'hr'), async (req, res) => {
//     try {
//       const [oldRows] = await pool.execute('SELECT * FROM payroll WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Payroll record not found' });
//       }
  
//       const oldRecord = oldRows[0];
  
//       // Update payroll status to paid
//       await pool.execute('UPDATE payroll SET status = "paid", payment_date = NOW() WHERE id = ?', [req.params.id]);
  
//       await logAuditTrail('payroll', req.params.id, 'UPDATE', oldRecord, { status: 'paid' }, req.user.id, req.ip);
  
//       res.json({ message: 'Payroll record marked as paid successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });


import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get payroll records
// export const getPayrollRecords = async (req, res) => {
//   try {
//     const { employee_id, status, pay_period_start, pay_period_end, page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     let query = `
//       SELECT p.*, e.first_name, e.last_name, e.employee_id as emp_code
//       FROM payroll p
//       JOIN employees e ON p.employee_id = e.id
//       WHERE 1=1
//     `;
//     let params = [];

//     if (employee_id) {
//       query += ' AND p.employee_id = ?';
//       params.push(employee_id);
//     }

//     if (status) {
//       query += ' AND p.status = ?';
//       params.push(status);
//     }

//     if (pay_period_start) {
//       query += ' AND p.pay_period_start >= ?';
//       params.push(pay_period_start);
//     }

//     if (pay_period_end) {
//       query += ' AND p.pay_period_end <= ?';
//       params.push(pay_period_end);
//     }

//     query += ' ORDER BY p.pay_period_start DESC LIMIT ? OFFSET ?';
//     params.push(parseInt(limit), parseInt(offset));

//     const [rows] = await pool.execute(query, params);
//     res.json({ payroll: rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

export const getPayrollRecords = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        e.first_name, 
        e.last_name, 
        e.employee_id as emp_code
      FROM payroll p
      JOIN employees e ON p.employee_id = e.id
      ORDER BY p.pay_period_start DESC
    `;

    const [rows] = await pool.execute(query);

    // Wrap the response in `payroll` key to match frontend expectations
    res.json({ payroll: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Create payroll record
export const createPayrollRecord = async (req, res) => {
  try {
    const {
      employee_id, pay_period_start, pay_period_end, regular_hours, overtime_hours,
      holiday_hours, sick_hours, vacation_hours, gross_pay, federal_tax, state_tax,
      social_security, medicare, health_insurance, retirement_401k, other_deductions,
      net_pay, payment_date, payment_method
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, regular_hours, overtime_hours,
       holiday_hours, sick_hours, vacation_hours, gross_pay, federal_tax, state_tax,
       social_security, medicare, health_insurance, retirement_401k, other_deductions,
       net_pay, payment_date, payment_method, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employee_id, pay_period_start, pay_period_end, regular_hours, overtime_hours,
       holiday_hours, sick_hours, vacation_hours, gross_pay, federal_tax, state_tax,
       social_security, medicare, health_insurance, retirement_401k, other_deductions,
       net_pay, payment_date, payment_method, req.user.id]
    );

    await logAuditTrail('payroll', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Payroll record created successfully', payrollId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Process payroll (approve and mark as paid)
export const processPayroll = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM payroll WHERE id = ? AND status = ?', [req.params.id, 'pending']);

    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Payroll record not found or not pending' });
    }

    await pool.execute(
      'UPDATE payroll SET status = ?, approved_by = ?, payment_date = CURDATE() WHERE id = ?',
      ['paid', req.user.id, req.params.id]
    );

    await logAuditTrail('payroll', req.params.id, 'UPDATE', oldRows[0], { status: 'paid', approved_by: req.user.id, payment_date: new Date() }, req.user.id, req.ip);

    res.json({ message: 'Payroll processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
