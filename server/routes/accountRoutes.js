import express from 'express';
import { getAllAccounts, createAccount, updateAccount } from '../controllers/accountController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all accounts
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllAccounts);

// Create new account
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant'), createAccount);

// Update account
router.put('/:id', authenticateToken, authorizeRoles('admin', 'accountant'), updateAccount);

export default router;
