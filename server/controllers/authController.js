 


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';
import sendMail from '../helpers/SendMail.js';
// import sendMail from '../helpers/sendMail.js';

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
    if (!username) {
      return res.status(400).json({ message: 'Username is required.' });
    }

    if (!email) {
      return res.status(400).json({ message: 'Email is required!' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required!' });
    }

    if (!role) {
      return res.status(400).json({ message: 'Invalid Role' });
    }

    // Check if user already exists
    const [existingUser] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role, employee_id, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, email, hashedPassword, role, employee_id || null, first_name || null, last_name || null]
    );

    // Send welcome email
    const emailResult = await sendMail({
      to: email,
      subject: 'Welcome to Our Platform!',
      text: `Hello ${first_name || username},

Welcome aboard! 🎉

We're excited to have you on our platform. If you have any questions or need assistance getting started, feel free to reach out.

Best regards,  
Your App Team`
    });

    if (!emailResult.success) {
      console.warn('User registered, but welcome email failed to send.');
    }

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId
    });
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

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Get user's current password
    const [users] = await pool.execute('SELECT password FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, users[0].password);
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

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if user exists
    const [users] = await pool.execute('SELECT id, username, email FROM users WHERE email = ? AND is_active = TRUE', [email]);
    if (users.length === 0) {
      // Don't reveal if email exists for security reasons
      return res.json({ message: 'If your email is registered, you will receive a password reset link' });
    }
    
    const user = users[0];
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Store reset token in database
    await pool.execute(
      'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
      [resetToken, resetTokenExpiry, user.id]
    );
    
    // FIXED: Send reset email with path parameter instead of query parameter
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
    
    const emailResult = await sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Hello ${user.username},

You have requested to reset your password. Please click the link below to reset your password:

${resetUrl}

This link will expire in 1 hour. If you did not request this password reset, please ignore this email.

Best regards,
Your App Team`
    });
    
    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send reset email' });
    }
    
    await logAuditTrail('users', user.id, 'UPDATE', null, { action: 'password_reset_requested' }, user.id, req.ip);
    
    res.json({ message: 'Message sent successfully, please check your email address, you will receive a password reset link' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Reset Password

export const resetPassword = async (req, res) => {
  try {
    // Get token from URL params and newPassword from body
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Find user with valid reset token
    const [users] = await pool.execute(
      'SELECT id, username, email FROM users WHERE reset_token = ? AND reset_token_expiry > NOW() AND is_active = TRUE',
      [token]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const user = users[0];

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await pool.execute(
      'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL, failed_login_attempts = 0, locked_until = NULL WHERE id = ?',
      [hashedPassword, user.id]
    );

    // Send confirmation email
    await sendMail({
      to: user.email,
      subject: 'Password Reset Successful',
      text: `Hello ${user.username},

Your password has been successfully reset. If you did not perform this action, please contact our support team immediately.

Best regards,
Your App Team`
    });

    await logAuditTrail('users', user.id, 'UPDATE', null, { action: 'password_reset_completed' }, user.id, req.ip);

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    // Validate input
    if (!first_name && !last_name) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    const updates = {};
    if (first_name) updates.first_name = first_name;
    if (last_name) updates.last_name = last_name;

    // Update user profile
    await pool.execute(
      'UPDATE users SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name)  WHERE id = ?',
      [updates.first_name, updates.last_name ,req.user.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update User Roles (Admin only)
export const updateUserRoles = async (req, res) => {
  try {
    const { userId, role } = req.body;

    // Check if requester is admin (implement your logic here)
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Validate input
    if (!userId || !role) {
      return res.status(400).json({ message: 'User ID and role are required' });
    }

    // Update user role
    await pool.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, userId]
    );

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};