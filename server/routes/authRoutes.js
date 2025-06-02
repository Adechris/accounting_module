import express from 'express';
import {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
  updateProfile,
  updateUserRoles
} from '../controllers/authController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// User Registration (Admin only)
router.post('/register', registerUser);
// Uncomment the next line if you want admin-only registration
// router.post('/admin/register', authenticateToken, authorizeRoles('admin'), registerUser);

// User Login
router.post('/login', loginUser);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', resetPassword);

// Change Password
router.put('/change-password', authenticateToken, changePassword);

// Update Profile
router.put('/profile', authenticateToken, updateProfile);

// Update User Roles (Admin only)
router.put('/user/roles', authenticateToken, authorizeRoles('admin'), updateUserRoles);

export default router;