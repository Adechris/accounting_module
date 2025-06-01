import pool from '../config/db.js';

const logAuditTrail = async (tableName, recordId, action, oldValues, newValues, userId, ipAddress) => {
  try {
    await pool.execute(
      'INSERT INTO audit_trail (table_name, record_id, action, old_values, new_values, user_id, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [tableName, recordId, action, JSON.stringify(oldValues), JSON.stringify(newValues), userId, ipAddress]
    );
  } catch (error) {
    console.error('Audit trail error:', error);
  }
};

export default logAuditTrail;
