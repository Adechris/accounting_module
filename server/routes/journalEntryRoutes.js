import express from 'express';
import { getJournalEntries, getJournalEntryDetails, createJournalEntry, postJournalEntry } from '../controllers/journalEntryController.js';
import authenticateToken from '../middlewares/authMiddleware.js';
import authorizeRoles from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Get journal entries
router.get('/', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getJournalEntries);

// Get journal entry details
router.get('/:id', authenticateToken, authorizeRoles('admin', 'accountant', 'manager'), getJournalEntryDetails);

// Create journal entry
router.post('/', authenticateToken, authorizeRoles('admin', 'accountant'), createJournalEntry);

// Post journal entry
router.put('/:id/post', authenticateToken, authorizeRoles('admin', 'accountant'), postJournalEntry);

export default router;
