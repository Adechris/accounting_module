import express from 'express';
import { getPayrollRecords, createPayrollRecord, processPayroll } from '../controllers/payrollController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get payroll records
router.get('/', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), getPayrollRecords);

// Create payroll record
router.post('/', authenticateToken, authorizeRoles('admin', 'hr'), createPayrollRecord);

// Process payroll (approve and mark as paid)
router.put('/:id/process', authenticateToken, authorizeRoles('admin', 'hr'), processPayroll);

export default router;
