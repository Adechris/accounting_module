import express from 'express';
import { getAllBills, getBillById, createBill, approveBill } from '../controllers/billController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all bills
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllBills);

// Get bill by ID with items
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getBillById);

// Create bill
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createBill);

// Approve bill
router.put('/:id/approve', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), approveBill);

export default router;
