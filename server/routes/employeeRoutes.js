import express from 'express';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all employees
router.get('/', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), getAllEmployees);

// Get employee by ID
router.get('/:id', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), getEmployeeById);

// Create new employee
router.post('/', authenticateToken, authorizeRoles('admin', 'hr'), createEmployee);

// Update employee
router.put('/:id', authenticateToken, authorizeRoles('admin', 'hr'), updateEmployee);

// Delete employee (Soft delete - set status to terminated)
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'hr'), deleteEmployee);

export default router;
