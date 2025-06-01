

 
// // =============================================================================
// // SUPPLIER ROUTES  
// // =============================================================================

// // Get all suppliers
// app.get('/api/suppliers', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const { status, page = 1, limit = 10 } = req.query;
//       const offset = (page - 1) * limit;
  
//       let query = 'SELECT * FROM suppliers WHERE 1=1';
//       let params = [];
  
//       if (status) {
//         query += ' AND status = ?';
//         params.push(status);
//       }
  
//       query += ' ORDER BY company_name LIMIT ? OFFSET ?';
//       params.push(parseInt(limit), parseInt(offset));
  
//       const [rows] = await pool.execute(query, params);
//       res.json({ suppliers: rows });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Create supplier
//   app.post('/api/suppliers', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const {
//         supplier_code, company_name, contact_person, email, phone, mobile, address,
//         city, state, postal_code, country, payment_terms, tax_id, website
//       } = req.body;
  
//       const [result] = await pool.execute(
//         `INSERT INTO suppliers (supplier_code, company_name, contact_person, email, phone, mobile, 
//          address, city, state, postal_code, country, payment_terms, tax_id, website) 
//          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//         [supplier_code, company_name, contact_person, email, phone, mobile, address,
//          city, state, postal_code, country, payment_terms, tax_id, website]
//       );
  
//       await logAuditTrail('suppliers', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
  
//       res.status(201).json({ message: 'Supplier created successfully', supplierId: result.insertId });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });
  
//   // Update supplier
//   app.put('/api/suppliers/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), async (req, res) => {
//     try {
//       const [oldRows] = await pool.execute('SELECT * FROM suppliers WHERE id = ?', [req.params.id]);
//       if (oldRows.length === 0) {
//         return res.status(404).json({ message: 'Supplier not found' });
//       }
  
//       const fields = Object.keys(req.body);
//       const values = Object.values(req.body);
//       const setClause = fields.map(field => `${field} = ?`).join(', ');
  
//       await pool.execute(
//         `UPDATE suppliers SET ${setClause} WHERE id = ?`,
//         [...values, req.params.id]
//       );
  
//       await logAuditTrail('suppliers', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
  
//       res.json({ message: 'Supplier updated successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
//   });


import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all suppliers
// export const getAllSuppliers = async (req, res) => {
//   try {
//     const { status, page = 1, limit = 10 } = req.query;
//     const offset = (page - 1) * limit;

//     let query = 'SELECT * FROM suppliers WHERE 1=1';
//     let params = [];

//     if (status) {
//       query += ' AND status = ?';
//       params.push(status);
//     }

//     query += ' ORDER BY company_name LIMIT ? OFFSET ?';
//     params.push(parseInt(limit), parseInt(offset));

//     const [rows] = await pool.execute(query, params);
//     res.json({ suppliers: rows });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


export const getAllSuppliers = async (req, res) => {
  try {
    const query = 'SELECT * FROM suppliers ORDER BY company_name';

    const [rows] = await pool.execute(query); // no params here
    res.json({ suppliers: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create supplier
export const createSupplier = async (req, res) => {
  try {
    const {
      supplier_code, company_name, contact_person, email, phone, mobile, address,
      city, state, postal_code, country, payment_terms, tax_id, website
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO suppliers (supplier_code, company_name, contact_person, email, phone, mobile,
       address, city, state, postal_code, country, payment_terms, tax_id, website)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [supplier_code, company_name, contact_person, email, phone, mobile, address,
       city, state, postal_code, country, payment_terms, tax_id, website]
    );

    await logAuditTrail('suppliers', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);

    res.status(201).json({ message: 'Supplier created successfully', supplierId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const [oldRows] = await pool.execute('SELECT * FROM suppliers WHERE id = ?', [req.params.id]);
    if (oldRows.length === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const setClause = fields.map(field => `${field} = ?`).join(', ');

    await pool.execute(
      `UPDATE suppliers SET ${setClause} WHERE id = ?`,
      [...values, req.params.id]
    );

    await logAuditTrail('suppliers', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);

    res.json({ message: 'Supplier updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
