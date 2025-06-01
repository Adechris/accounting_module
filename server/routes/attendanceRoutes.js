import express from 'express';
import { getAttendanceRecords, adminClockInOut, createAttendance } from '../controllers/attendanceController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get attendance records
router.get('/', authenticateToken,authorizeRoles('admin', 'hr', 'manager'), getAttendanceRecords);

// Clock in/out - FIXED: Remove the duplicate 'attendance' from the path
router.post('/clock-in-out', authenticateToken, adminClockInOut);

// Manual attendance entry (HR/Manager only)
router.post('/', authenticateToken, authorizeRoles('admin', 'hr', 'manager'), createAttendance);

export default router;