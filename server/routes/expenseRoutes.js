import express from 'express';
import { getAllExpenses, createExpense, approveRejectExpense } from '../controllers/expenseController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all expenses
router.get('/', authenticateToken, getAllExpenses);

// Create expense
router.post('/', authenticateToken, createExpense);

// Approve/Reject expense
router.put('/:id/approve', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), approveRejectExpense);

export default router;
