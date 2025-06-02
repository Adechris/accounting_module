
import express from 'express';
import { getAllBudgets, createBudget, updateBudget, deleteBudget, getBudgetById } from '../controllers/budgetController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all budgets
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllBudgets);

// Create budget
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createBudget);

// Update budget
router.put('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), updateBudget);

// Delete budget
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), deleteBudget);

// Get budget by ID
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getBudgetById);

export default router;