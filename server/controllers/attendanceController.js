// // =============================================================================
// // ATTENDANCE ROUTES
// // =============================================================================

// // Get attendance records
// app.get('/api/attendance', authenticateToken, async (req, res) => {
//     try {
//       const { employee_id, date_from, date_to, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = `
//         SELECT a.*, e.first_name, e.last_name, e.employee_id as emp_code 
//         FROM attendance a 
//         JOIN employees e ON a.employee_id = e.id 
//         WHERE 1=1
//       `;
//       let params = [];
  
//       // Role-based filtering
//       if (req.user.role === 'employee' && req.user.employee_id) {
//         query += ' AND a.employee_id = ?';
//         params.push(req.user.employee_id);
//       } else if (employee_id) {
//         query += ' AND a.employee_id = ?';
//         params.push(employee_id);
//       }
  
//       if (date_from) {
//         query += ' AND a.date >= ?';
//         params.push(date_from);
//       }
  
//       if (date_to) {
//         query += ' AND a.date <= ?';
//         params.push(date_to);
//       }
  
//       query += ' ORDER BY a.date DESC LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
  
//       res.json({ attendance: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Clock in/out
//   app.post('/api/attendance/clock', authenticateToken, async (req, res) => {
//     try {
//       const { action } = req.body; // 'in' or 'out'
      
//       if (!req.user.employee_id) {
//         return res.status(400).json({ message: 'User not linked to an employee record' });
//       }
  
//       const today = new Date().toISOString().split('T')[0];
//       const currentTime = new Date().toTimeString().split(' ')[0];
  
//       if (action === 'in') {
//         // Check if already clocked in today
//         const [existing] = await pool.execute(
//           'SELECT id FROM attendance WHERE employee_id = ? AND date = ?',
//           [req.user.employee_id, today]
//         );
  
//         if (existing.length > 0) {
//           return res.status(400).json({ message: 'Already clocked in today' });
//         }
  
//         // Create new attendance record
//         const [result] = await pool.execute(
//           'INSERT INTO attendance (employee_id, date, check_in_time, status) VALUES (?, ?, ?, ?)',
//           [req.user.employee_id, today, currentTime, 'present']
//         );
  
//         await logAuditTrail('attendance', result.insertId, 'INSERT', null, { action: 'clock_in', time: currentTime }, req.user.id, req.ip);
  
//         res.json({ message: 'Clocked in successfully', time: currentTime });
//       } else if (action === 'out') {
//         // Find today's attendance record
//         const [existing] = await pool.execute(
//           'SELECT * FROM attendance WHERE employee_id = ? AND date = ? AND check_out_time IS NULL',
//           [req.user.employee_id, today]
//         );
  
//         if (existing.length === 0) {
//           return res.status(400).json({ message: 'No active clock-in found for today' });
//         }
  
//         // Calculate total hours
//         const checkInTime = new Date(`${today} ${existing[0].check_in_time}`);
//         const checkOutTime = new Date(`${today} ${currentTime}`);
//         const totalHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
  
//         // Update attendance record
//         await pool.execute(
//           'UPDATE attendance SET check_out_time = ?, total_hours = ? WHERE id = ?',
//           [currentTime, totalHours, existing[0].id]
//         );
  
//         await logAuditTrail('attendance', existing[0].id, 'UPDATE', existing[0], { action: 'clock_out', check_out_time: currentTime, total_hours: totalHours }, req.user.id, req.ip);
  
//         res.json({ message: 'Clocked out successfully', time: currentTime, totalHours });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Manual attendance entry (HR/Manager only)
//   app.post('/api/attendance', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), async (req, res) => {
//     try {
//       const {
//         employee_id, date, check_in_time, check_out_time, break_duration,
//         total_hours, overtime_hours, status, notes
//       } = req.body;
  
//       const [result] = await pool.execute(
//         `INSERT INTO attendance (employee_id, date, check_in_time, check_out_time, break_duration, 
//          total_hours, overtime_hours, status, notes, approved_by) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [employee_id, date, check_in_time, check_out_time, break_duration,
//          total_hours, overtime_hours, status, notes, req.user.id]
//       );
  
//       await logAuditTrail('attendance', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Attendance record created successfully', attendanceId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
// // Update attendance record (HR/Manager only)   














import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get attendance records
// export const getAttendanceRecords = async (req, res) => {
//   try {
//     // const { employee_id, date_from, date_to, page = 1, limit = 10 } = req.query;
//     // const offset = (page - 1) * limit;

//     let query = `
//       SELECT a.*, e.first_name, e.last_name, e.employee_id as emp_code
//       FROM attendance a
//       JOIN employees e ON a.employee_id = e.id
//       WHERE 1=1
//     `;
//     // let params = [];

//     if (req.user.role === 'employee' && req.user.employee_id) {
//       query += ' AND a.employee_id = ?';
//       params.push(req.user.employee_id);
//     } else if (employee_id) {
//       query += ' AND a.employee_id = ?';
//       params.push(employee_id);
//     }

//     if (date_from) {
//       query += ' AND a.date >= ?';
//       params.push(date_from);
//     }

//     if (date_to) {
//       query += ' AND a.date <= ?';
//       params.push(date_to);
//     }

//     query += ' ORDER BY a.date DESC LIMIT ? OFFSET ?';
//     params.push(parseInt(limit), parseInt(offset));

//     const [rows] = await pool.execute(query, params);

//     res.json({ attendance: rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// Get attendance records

export const getAttendanceRecords = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT a.*, e.first_name, e.last_name, e.employee_id as emp_code
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      ORDER BY a.date DESC
    `);

    res.json({ attendance: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Clock in/out
// export const clockInOut = async (req, res) => {
//   try {
//     const { action } = req.body;

//     if (!req.user.employee_id) {
//       return res.status(400).json({ message: 'User not linked to an employee record' });
//     }

//     const today = new Date().toISOString().split('T')[0];
//     const currentTime = new Date().toTimeString().split(' ')[0];

//     if (action === 'in') {
//       const [existing] = await pool.execute(
//         'SELECT id FROM attendance WHERE employee_id = ? AND date = ?',
//         [req.user.employee_id, today]
//       );

//       if (existing.length > 0) {
//         return res.status(400).json({ message: 'Already clocked in today' });
//       }

//       const [result] = await pool.execute(
//         'INSERT INTO attendance (employee_id, date, check_in_time, status) VALUES (?, ?, ?, ?)',
//         [req.user.employee_id, today, currentTime, 'present']
//       );

//       await logAuditTrail('attendance', result.insertId, 'INSERT', null, { action: 'clock_in', time: currentTime }, req.user.id, req.ip);

//       res.json({ message: 'Clocked in successfully', time: currentTime });
//     } else if (action === 'out') {
//       const [existing] = await pool.execute(
//         'SELECT * FROM attendance WHERE employee_id = ? AND date = ? AND check_out_time IS NULL',
//         [req.user.employee_id, today]
//       );

//       if (existing.length === 0) {
//         return res.status(400).json({ message: 'No active clock-in found for today' });
//       }

//       const checkInTime = new Date(`${today} ${existing[0].check_in_time}`);
//       const checkOutTime = new Date(`${today} ${currentTime}`);
//       const totalHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);

//       await pool.execute(
//         'UPDATE attendance SET check_out_time = ?, total_hours = ? WHERE id = ?',
//         [currentTime, totalHours, existing[0].id]
//       );

//       await logAuditTrail('attendance', existing[0].id, 'UPDATE', existing[0], { action: 'clock_out', check_out_time: currentTime, total_hours: totalHours }, req.user.id, req.ip);

//       res.json({ message: 'Clocked out successfully', time: currentTime, totalHours });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
// In your attendance routes file
export const adminClockInOut = async (req, res) => {
  try {
    const { employee_id, action } = req.body;
    
    if (!employee_id) {
      return res.status(400).json({ message: 'Employee ID is required' });
    }

    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];

    if (action === 'in') {
      // Check if already clocked in today
      const [existing] = await pool.execute(
        'SELECT id FROM attendance WHERE employee_id = ? AND date = ?',
        [employee_id, today]
      );

      if (existing.length > 0) {
        return res.status(400).json({ message: 'Employee already checked in today' });
      }

      // Clock in
      const [result] = await pool.execute(
        'INSERT INTO attendance (employee_id, date, check_in_time, status) VALUES (?, ?, ?, ?)',
        [employee_id, today, currentTime, 'present']
      );

      res.json({ 
        message: 'Clocked in successfully', 
        time: currentTime,
        attendanceId: result.insertId 
      });

    } else if (action === 'out') {
      // Find active clock-in for today
      const [existing] = await pool.execute(
        'SELECT * FROM attendance WHERE employee_id = ? AND date = ? AND check_out_time IS NULL',
        [employee_id, today]
      );

      if (existing.length === 0) {
        return res.status(400).json({ message: 'No active clock-in found for today' });
      }

      // Calculate total hours
      const checkInTime = new Date(`${today} ${existing[0].check_in_time}`);
      const checkOutTime = new Date(`${today} ${currentTime}`);
      const totalHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);

      // Clock out
      await pool.execute(
        'UPDATE attendance SET check_out_time = ?, total_hours = ? WHERE id = ?',
        [currentTime, totalHours, existing[0].id]
      );

      res.json({ 
        message: 'Clocked out successfully', 
        time: currentTime, 
        totalHours: totalHours 
      });
    }
  } catch (error) {
    console.error('Clock in/out error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Manual attendance entry (HR/Manager only)
export const createAttendance = async (req, res) => {
  try {
    const {
      employee_id, date, check_in_time, check_out_time, break_duration,
      total_hours, overtime_hours, status, notes
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO attendance (employee_id, date, check_in_time, check_out_time, break_duration,
       total_hours, overtime_hours, status, notes, approved_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [employee_id, date, check_in_time, check_out_time, break_duration,
       total_hours, overtime_hours, status, notes, req.user.id]
    );

    await logAuditTrail('attendance', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Attendance record created successfully', attendanceId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
