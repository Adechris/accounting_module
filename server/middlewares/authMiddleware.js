import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ? AND is_active = TRUE', [decoded.userId]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateToken;
