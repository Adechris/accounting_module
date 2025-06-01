import express from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// User Registration (Admin only)
router.post('/register',  registerUser);
// router.post('/admin/register', authenticateToken, authorizeRoles('admin'), registerUser);


// User Login
router.post('/login', loginUser);

// Change Password
router.put('/change-password', authenticateToken, changePassword);

export default router;
