
import express from 'express';
import { getAllDepartments, createDepartment, updateDepartment, deleteDepartment, getDepartmentById } from '../controllers/departmentController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get all departments
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getAllDepartments);

// Create department
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), createDepartment);

// Update department
router.put('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), updateDepartment);

// Delete department
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), deleteDepartment);

// Get department by ID
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getDepartmentById);

export default router;