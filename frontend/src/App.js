import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Route Protection Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import PublicRoute from './components/Auth/PublicRoute';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ChangePassword from './components/Auth/ChangePassword';
import Dashboard from './components/Dashboard/Dashboard';

import EmployeeList from './components/Employees/EmployeeList';
import AddEmployee from './components/Employees/AddEmployee';
import EditEmployee from './components/Employees/EditEmployee';

import AttendanceList from './components/Attendance/AttendanceList';
import ClockInOut from './components/Attendance/ClockInOut';
import AddAttendance from './components/Attendance/AddAttendance';

import AccountList from './components/Accounts/AccountList';
import AddAccount from './components/Accounts/AddAccount';
import EditAccount from './components/Accounts/EditAccount';

import JournalEntryList from './components/JournalEntries/JournalEntryList';
import AddJournalEntry from './components/JournalEntries/AddJournalEntry';
import JournalEntryDetails from './components/JournalEntries/JournalEntryDetails';

import CustomerList from './components/Customers/CustomerList';
import AddCustomer from './components/Customers/AddCustomer';
import EditCustomer from './components/Customers/EditCustomer';

import SupplierList from './components/Suppliers/SupplierList';
import AddSupplier from './components/Suppliers/AddSupplier';
import EditSupplier from './components/Suppliers/EditSupplier';

import InvoiceList from './components/Invoices/InvoiceList';
import AddInvoice from './components/Invoices/AddInvoice';
import InvoiceDetails from './components/Invoices/InvoiceDetails';
import EditInvoiceStatus from './components/Invoices/EditInvoiceStatus';

import BillList from './components/Bills/BillList';
import AddBill from './components/Bills/AddBill';
import BillDetails from './components/Bills/BillDetails';
import ApproveBill from './components/Bills/ApproveBill';

import PaymentList from './components/Payments/PaymentList';
import AddPayment from './components/Payments/AddPayment';

import ExpenseList from './components/Expenses/ExpenseList';
import AddExpense from './components/Expenses/AddExpense';
import ApproveExpense from './components/Expenses/ApproveExpense';

import AssetList from './components/Assets/AssetList';
import AddAsset from './components/Assets/AddAsset';
import EditAsset from './components/Assets/EditAsset';


import DepartmentList from './components/Department/DepartmentList';
import AddDepartment from './components/Department/AddDepartment';
import EditDepartment from './components/Department/EditDepartment';

import PayrollList from './components/Payroll/PayrollList';
import AddPayroll from './components/Payroll/AddPayroll';

import DashboardLayout from './components/Layout/DashboardLayout';


import Error from './components/ErrorPage/Error';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes - redirect to dashboard if already logged in */}
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          
          {/* Semi-protected route - change password can be accessed by logged in users */}
          <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          
          {/* All dashboard routes - require authentication */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
          
          <Route path="/employees" element={<ProtectedRoute><DashboardLayout><EmployeeList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-employee" element={<ProtectedRoute><DashboardLayout><AddEmployee /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><DashboardLayout><EditEmployee /></DashboardLayout></ProtectedRoute>} />

          <Route path="/attendance" element={<ProtectedRoute><DashboardLayout><AttendanceList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/clock" element={<ProtectedRoute><DashboardLayout><ClockInOut /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-attendance" element={<ProtectedRoute><DashboardLayout><AddAttendance /></DashboardLayout></ProtectedRoute>} />

          <Route path="/accounts" element={<ProtectedRoute><DashboardLayout><AccountList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-account" element={<ProtectedRoute><DashboardLayout><AddAccount /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-account/:id" element={<ProtectedRoute><DashboardLayout><EditAccount /></DashboardLayout></ProtectedRoute>} />

          <Route path="/journal-entries" element={<ProtectedRoute><DashboardLayout><JournalEntryList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-journal-entry" element={<ProtectedRoute><DashboardLayout><AddJournalEntry /></DashboardLayout></ProtectedRoute>} />
          <Route path="/journal-entry/:id" element={<ProtectedRoute><DashboardLayout><JournalEntryDetails /></DashboardLayout></ProtectedRoute>} />

          <Route path="/customers" element={<ProtectedRoute><DashboardLayout><CustomerList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-customer" element={<ProtectedRoute><DashboardLayout><AddCustomer /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-customer/:id" element={<ProtectedRoute><DashboardLayout><EditCustomer /></DashboardLayout></ProtectedRoute>} />

          <Route path="/suppliers" element={<ProtectedRoute><DashboardLayout><SupplierList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-supplier" element={<ProtectedRoute><DashboardLayout><AddSupplier /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-supplier/:id" element={<ProtectedRoute><DashboardLayout><EditSupplier /></DashboardLayout></ProtectedRoute>} />

          <Route path="/invoices" element={<ProtectedRoute><DashboardLayout><InvoiceList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-invoice" element={<ProtectedRoute><DashboardLayout><AddInvoice /></DashboardLayout></ProtectedRoute>} />
          <Route path="/invoice/:id" element={<ProtectedRoute><DashboardLayout><InvoiceDetails /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-invoice-status/:id" element={<ProtectedRoute><DashboardLayout><EditInvoiceStatus /></DashboardLayout></ProtectedRoute>} />

          <Route path="/bills" element={<ProtectedRoute><DashboardLayout><BillList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-bill" element={<ProtectedRoute><DashboardLayout><AddBill /></DashboardLayout></ProtectedRoute>} />
          <Route path="/bill/:id" element={<ProtectedRoute><DashboardLayout><BillDetails /></DashboardLayout></ProtectedRoute>} />
          <Route path="/approve-bill/:id" element={<ProtectedRoute><DashboardLayout><ApproveBill /></DashboardLayout></ProtectedRoute>} />

          <Route path="/payments" element={<ProtectedRoute><DashboardLayout><PaymentList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-payment" element={<ProtectedRoute><DashboardLayout><AddPayment /></DashboardLayout></ProtectedRoute>} />

          <Route path="/expenses" element={<ProtectedRoute><DashboardLayout><ExpenseList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-expense" element={<ProtectedRoute><DashboardLayout><AddExpense /></DashboardLayout></ProtectedRoute>} />
          <Route path="/approve-expense/:id" element={<ProtectedRoute><DashboardLayout><ApproveExpense /></DashboardLayout></ProtectedRoute>} />

          <Route path="/payroll" element={<ProtectedRoute><DashboardLayout><PayrollList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-payroll" element={<ProtectedRoute><DashboardLayout><AddPayroll /></DashboardLayout></ProtectedRoute>} />


          <Route path="/assets" element={<ProtectedRoute><DashboardLayout><AssetList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-asset" element={<ProtectedRoute><DashboardLayout><AddAsset /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-asset/:id" element={<ProtectedRoute><DashboardLayout><EditAsset /></DashboardLayout></ProtectedRoute>} />
          {/* Add more routes as needed */}

          <Route path="/departments" element={<ProtectedRoute><DashboardLayout><DepartmentList /></DashboardLayout></ProtectedRoute>} />
          <Route path="/add-department" element={<ProtectedRoute><DashboardLayout><AddDepartment /></DashboardLayout></ProtectedRoute>} />
          <Route path="/edit-department/:id" element={<ProtectedRoute><DashboardLayout><EditDepartment /></DashboardLayout></ProtectedRoute>} />
          
          {/* Fallback route for 404 - can be a NotFound component */}  
          <Route path="*" element={<ProtectedRoute><DashboardLayout><Error /></DashboardLayout></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;