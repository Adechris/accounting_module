import express from 'express';
import { getAllInvoices, getInvoiceById, createInvoice, updateInvoiceStatus } from '../controllers/invoiceController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all invoices
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllInvoices);

// Get invoice by ID with items
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getInvoiceById);

// Create invoice
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createInvoice);

// Update invoice status
router.put('/:id/status', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), updateInvoiceStatus);

export default router;
