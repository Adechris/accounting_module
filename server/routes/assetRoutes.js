
import express from 'express';
import { getAllAssets, createAsset, updateAsset, deleteAsset, getAssetById } from '../controllers/assetController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all assets
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllAssets);

// Create asset
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createAsset);

// Update asset
router.put('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), updateAsset);

// Delete asset
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), deleteAsset);

// Get asset by ID
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAssetById);

export default router;