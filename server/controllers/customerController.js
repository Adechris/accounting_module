

// app.get('/api/customers', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const { status, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = 'SELECT * FROM customers WHERE 1=1';
//       let params = [];
  
//       if (status) {
//         query += ' AND status = ?';
//         params.push(status);
//       }
  
//       query += ' ORDER BY company_name LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       res.json({ customers: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create customer
//   app.post('/api/customers', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const {
//         customer_code, company_name, contact_person, email, phone, mobile, address,
//         city, state, postal_code, country, credit_limit, payment_terms, tax_id, website
//       } = req.body;
  
//       const [result] = await pool.execute(
//         `INSERT INTO customers (customer_code, company_name, contact_person, email, phone, mobile, 
//          address, city, state, postal_code, country, credit_limit, payment_terms, tax_id, website) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [customer_code, company_name, contact_person, email, phone, mobile, address,
//          city, state, postal_code, country, credit_limit, payment_terms, tax_id, website]
//       );
  
//       await logAuditTrail('customers', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Update customer
//   app.put('/api/customers/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const [oldRows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Customer not found' });
//       }
  
//       const fields = Object.keys(req.body);
//       const values = Object.values(req.body);
//       const setClause = fields.map(field => `${field} = ?`).join(', ');
  
//       await pool.execute(
//         `UPDATE customers SET ${setClause} WHERE id = ?`,
//         [...values, req.params.id]
//       );
  
//       await logAuditTrail('customers', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
  
//       res.json({ message: 'Customer updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });







import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    // const { status, page = 1, limit = 10 } = req.query;
    // const offset = (page - 1) * limit;

    let query = 'SELECT * FROM customers';
    // let params = [];

    // if (status) {
    //   query += ' AND status = ?';
    //   params.push(status);
    // }

    // query += ' ORDER BY company_name LIMIT ? OFFSET ?';
    // params.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query);
    res.json({ customers: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create customer
export const createCustomer = async (req, res) => {
  try {
    const {
      customer_code, company_name, contact_person, email, phone, mobile, address,
      city, state, postal_code, country, credit_limit, payment_terms, tax_id, website
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO customers (customer_code, company_name, contact_person, email, phone, mobile,
       address, city, state, postal_code, country, credit_limit, payment_terms, tax_id, website)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [customer_code, company_name, contact_person, email, phone, mobile, address,
       city, state, postal_code, country, credit_limit, payment_terms, tax_id, website]
    );

    await logAuditTrail('customers', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await pool.execute(
      `UPDATE customers SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    await logAuditTrail('customers', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);

    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Delete customer 
export const deleteCustomer = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await pool.execute('DELETE FROM customers WHERE id = ?', [req.params.id]);

    await logAuditTrail('customers', req.params.id, 'DELETE', oldRows[0], null, req.user.id, req.ip);

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ customer: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};