import express from 'express';
import { getAllPayments, createPayment } from '../controllers/paymentController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all payments
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllPayments);

// Create payment
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createPayment);

export default router;
