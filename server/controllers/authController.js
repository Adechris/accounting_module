import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// User Registration (Admin only)
// export const registerAdmin = async (req, res) => {
//   console.log('Received registration request:', req.body); // Log request body
//   try {
//     const { username, email, password, role, employee_id } = req.body;

//     // Check if user already exists
//     const [existingUser] = await pool.execute('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user
//     const [result] = await pool.execute(
//       'INSERT INTO users (username, email, password, role, employee_id) VALUES (?, ?, ?, ?, ?)',
//       [username, email, hashedPassword, role, employee_id]
//     );

//     await logAuditTrail('users', result.insertId, 'INSERT', null, { username, email, role }, req.user.id, req.ip);

//     res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

export const registerUser = async (req, res) => {
 
  try {
    const { username, email, password, role, employee_id, first_name, last_name } = req.body;

    // Check if required fields are provided
    if (!username ) {
      return res.status(400).json({ message: 'Username isrequired.' });
    };

    if(!email){
      return res.status(400).json({message:"Email is required!"})
    };
    if(!password){
      return res.status(400).json({message:"Password is required!"})
    };
    if(!role){
      return res.status(400).json({message:"Invalid Role"})
    };

    // Check if user already exists
    const [existingUser] = await pool.execute('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role, employee_id, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, role , employee_id || null, first_name || null, last_name || null]
    );

    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if(!password){
      return res.status(400).json({message:"Password is required!"})
    }
    if(!username){
      return res.status(400).json({message:"username is required!"})
    }

    // Get user
    const [users] = await pool.execute('SELECT * FROM users WHERE username = ? AND is_active = TRUE', [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];

    // Check if account is locked
    if (user.locked_until && new Date() < new Date(user.locked_until)) {
      return res.status(423).json({ message: 'Account temporarily locked. Try again later.' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // Increment failed attempts
      await pool.execute(
        'UPDATE users SET failed_login_attempts = failed_login_attempts + 1, locked_until = IF(failed_login_attempts >= 4, DATE_ADD(NOW(), INTERVAL 30 MINUTE), NULL) WHERE id = ?',
        [user.id]
      );
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset failed attempts and update last login
    await pool.execute(
      'UPDATE users SET failed_login_attempts = 0, locked_until = NULL, last_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        employee_id: user.employee_id
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, req.user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, req.user.id]);

    await logAuditTrail('users', req.user.id, 'UPDATE', null, { action: 'password_changed' }, req.user.id, req.ip);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
