import express from 'express';
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer, getCustomerById } from '../controllers/customerController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all customers
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllCustomers);

// Create customer
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createCustomer);

// Update customer
router.put('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), updateCustomer);
// Delete customer (Soft delete - set status to inactive)
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), deleteCustomer);
// Get customer by ID
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getCustomerById);

export default router;
