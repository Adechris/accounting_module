import express from 'express';
import { getAllSuppliers, createSupplier, updateSupplier } from '../controllers/supplierController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all suppliers
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllSuppliers);

// Create supplier
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createSupplier);

// Update supplier
router.put('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), updateSupplier);

export default router;
