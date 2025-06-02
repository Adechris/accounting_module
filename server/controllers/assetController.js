import pool from '../config/db.js';
import logAuditTrail from '../utils/auditTrail.js';

// Get all assets
export const getAllAssets = async (req, res) => {
    try {
      let query = 'SELECT * FROM assets';
      
      const [rows] = await pool.execute(query);
      res.json({ assets: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Create asset
  export const createAsset = async (req, res) => {
    try {
      const {
        asset_name, asset_tag, category, purchase_date, purchase_price,
        current_value, department_id, assigned_to, status
      } = req.body;
  
      const [result] = await pool.execute(
        `INSERT INTO assets (asset_name, asset_tag, category, purchase_date, purchase_price,
         current_value, department_id, assigned_to, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [asset_name, asset_tag, category, purchase_date, purchase_price,
         current_value, department_id, assigned_to, status]
      );
  
      await logAuditTrail('assets', result.insertId, 'INSERT', null, req.body, req.user.id, req.ip);
      res.status(201).json({ message: 'Asset created successfully', assetId: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Update asset
  export const updateAsset = async (req, res) => {
    try {
      const [oldRows] = await pool.execute('SELECT * FROM assets WHERE id = ?', [req.params.id]);
      if (oldRows.length === 0) {
        return res.status(404).json({ message: 'Asset not found' });
      }
  
      const fields = Object.keys(req.body);
      const values = Object.values(req.body);
      const setClause = fields.map(field => `${field} = ?`).join(', ');
  
      await pool.execute(
        `UPDATE assets SET ${setClause} WHERE id = ?`,
        [...values, req.params.id]
      );
  
      await logAuditTrail('assets', req.params.id, 'UPDATE', oldRows[0], req.body, req.user.id, req.ip);
      res.json({ message: 'Asset updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Delete asset
  export const deleteAsset = async (req, res) => {
    try {
      const [oldRows] = await pool.execute('SELECT * FROM assets WHERE id = ?', [req.params.id]);
      if (oldRows.length === 0) {
        return res.status(404).json({ message: 'Asset not found' });
      }
  
      await pool.execute('DELETE FROM assets WHERE id = ?', [req.params.id]);
      await logAuditTrail('assets', req.params.id, 'DELETE', oldRows[0], null, req.user.id, req.ip);
      res.json({ message: 'Asset deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Get asset by ID
  export const getAssetById = async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM assets WHERE id = ?', [req.params.id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.json({ asset: rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };