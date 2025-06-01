import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Owolabi123$',
  database: process.env.DB_NAME || 'accounting_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// Test the connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection successful');
    connection.release(); // Don't forget to release the connection back to the pool
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
})();

export default pool;
