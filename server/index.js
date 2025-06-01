import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import journalEntryRoutes from './routes/journalEntryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import billRoutes from './routes/billRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT  || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // This should be "http://localhost:3000"
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/journal-entries', journalEntryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/payroll', payrollRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
