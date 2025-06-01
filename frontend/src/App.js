 





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';

// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import ChangePassword from './components/Auth/ChangePassword';
// import Dashboard from './components/Dashboard/Dashboard';

// import EmployeeList from './components/Employees/EmployeeList';
// import AddEmployee from './components/Employees/AddEmployee';
// import EditEmployee from './components/Employees/EditEmployee';

// import AttendanceList from './components/Attendance/AttendanceList';
// import ClockInOut from './components/Attendance/ClockInOut';
// import AddAttendance from './components/Attendance/AddAttendance';

// import AccountList from './components/Accounts/AccountList';
// import AddAccount from './components/Accounts/AddAccount';
// import EditAccount from './components/Accounts/EditAccount';

// import JournalEntryList from './components/JournalEntries/JournalEntryList';
// import AddJournalEntry from './components/JournalEntries/AddJournalEntry';
// import JournalEntryDetails from './components/JournalEntries/JournalEntryDetails';

// import CustomerList from './components/Customers/CustomerList';
// import AddCustomer from './components/Customers/AddCustomer';
// import EditCustomer from './components/Customers/EditCustomer';

// import SupplierList from './components/Suppliers/SupplierList';
// import AddSupplier from './components/Suppliers/AddSupplier';
// import EditSupplier from './components/Suppliers/EditSupplier';

// import InvoiceList from './components/Invoices/InvoiceList';
// import AddInvoice from './components/Invoices/AddInvoice';
// import InvoiceDetails from './components/Invoices/InvoiceDetails';
// import EditInvoiceStatus from './components/Invoices/EditInvoiceStatus';

// import BillList from './components/Bills/BillList';
// import AddBill from './components/Bills/AddBill';
// import BillDetails from './components/Bills/BillDetails';
// import ApproveBill from './components/Bills/ApproveBill';

// import PaymentList from './components/Payments/PaymentList';
// import AddPayment from './components/Payments/AddPayment';

// import ExpenseList from './components/Expenses/ExpenseList';
// import AddExpense from './components/Expenses/AddExpense';
// import ApproveExpense from './components/Expenses/ApproveExpense';

// import PayrollList from './components/Payroll/PayrollList';
// import AddPayroll from './components/Payroll/AddPayroll';
// // import ProcessPayroll from './components/Payroll/ProcessPayroll';

// import Header from './components/Layout/Header';
// // import Footer from './components/Layout/Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   return (
//     <Router>
//       <AuthProvider>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/change-password" element={<ChangePassword />} />
//           <Route path="/dashboard" element={<Dashboard />} />

//           <Route path="/employees" element={<EmployeeList />} />
//           <Route path="/add-employee" element={<AddEmployee />} />
//           <Route path="/edit-employee/:id" element={<EditEmployee />} />

//           <Route path="/attendance" element={<AttendanceList />} />
//           <Route path="/clock" element={<ClockInOut />} />
//           <Route path="/add-attendance" element={<AddAttendance />} />

//           <Route path="/accounts" element={<AccountList />} />
//           <Route path="/add-account" element={<AddAccount />} />
//           <Route path="/edit-account/:id" element={<EditAccount />} />

//           <Route path="/journal-entries" element={<JournalEntryList />} />
//           <Route path="/add-journal-entry" element={<AddJournalEntry />} />
//           <Route path="/journal-entry/:id" element={<JournalEntryDetails />} />

//           <Route path="/customers" element={<CustomerList />} />
//           <Route path="/add-customer" element={<AddCustomer />} />
//           <Route path="/edit-customer/:id" element={<EditCustomer />} />

//           <Route path="/suppliers" element={<SupplierList />} />
//           <Route path="/add-supplier" element={<AddSupplier />} />
//           <Route path="/edit-supplier/:id" element={<EditSupplier />} />

//           <Route path="/invoices" element={<InvoiceList />} />
//           <Route path="/add-invoice" element={<AddInvoice />} />
//           <Route path="/invoice/:id" element={<InvoiceDetails />} />
//           <Route path="/edit-invoice-status/:id" element={<EditInvoiceStatus />} />

//           <Route path="/bills" element={<BillList />} />
//           <Route path="/add-bill" element={<AddBill />} />
//           <Route path="/bill/:id" element={<BillDetails />} />
//           <Route path="/approve-bill/:id" element={<ApproveBill />} />

//           <Route path="/payments" element={<PaymentList />} />
//           <Route path="/add-payment" element={<AddPayment />} />

//           <Route path="/expenses" element={<ExpenseList />} />
//           <Route path="/add-expense" element={<AddExpense />} />
//           <Route path="/approve-expense/:id" element={<ApproveExpense />} />

//           <Route path="/payroll" element={<PayrollList />} />
//           <Route path="/add-payroll" element={<AddPayroll />} />
//           {/* <Route path="/process-payroll/:id" element={<ProcessPayroll />} /> */}
//         </Routes>
//         {/* <Footer /> */}
//       </AuthProvider>
//     </Router>
//   );
// };

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
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

import PayrollList from './components/Payroll/PayrollList';
import AddPayroll from './components/Payroll/AddPayroll';

import DashboardLayout from './components/Layout/DashboardLayout';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth routes without layout */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          
          {/* All dashboard routes with layout */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          
          <Route path="/employees" element={<DashboardLayout><EmployeeList /></DashboardLayout>} />
          <Route path="/add-employee" element={<DashboardLayout><AddEmployee /></DashboardLayout>} />
          <Route path="/edit-employee/:id" element={<DashboardLayout><EditEmployee /></DashboardLayout>} />

          <Route path="/attendance" element={<DashboardLayout><AttendanceList /></DashboardLayout>} />
          <Route path="/clock" element={<DashboardLayout><ClockInOut /></DashboardLayout>} />
          <Route path="/add-attendance" element={<DashboardLayout><AddAttendance /></DashboardLayout>} />

          <Route path="/accounts" element={<DashboardLayout><AccountList /></DashboardLayout>} />
          <Route path="/add-account" element={<DashboardLayout><AddAccount /></DashboardLayout>} />
          <Route path="/edit-account/:id" element={<DashboardLayout><EditAccount /></DashboardLayout>} />

          <Route path="/journal-entries" element={<DashboardLayout><JournalEntryList /></DashboardLayout>} />
          <Route path="/add-journal-entry" element={<DashboardLayout><AddJournalEntry /></DashboardLayout>} />
          <Route path="/journal-entry/:id" element={<DashboardLayout><JournalEntryDetails /></DashboardLayout>} />

          <Route path="/customers" element={<DashboardLayout><CustomerList /></DashboardLayout>} />
          <Route path="/add-customer" element={<DashboardLayout><AddCustomer /></DashboardLayout>} />
          <Route path="/edit-customer/:id" element={<DashboardLayout><EditCustomer /></DashboardLayout>} />

          <Route path="/suppliers" element={<DashboardLayout><SupplierList /></DashboardLayout>} />
          <Route path="/add-supplier" element={<DashboardLayout><AddSupplier /></DashboardLayout>} />
          <Route path="/edit-supplier/:id" element={<DashboardLayout><EditSupplier /></DashboardLayout>} />

          <Route path="/invoices" element={<DashboardLayout><InvoiceList /></DashboardLayout>} />
          <Route path="/add-invoice" element={<DashboardLayout><AddInvoice /></DashboardLayout>} />
          <Route path="/invoice/:id" element={<DashboardLayout><InvoiceDetails /></DashboardLayout>} />
          <Route path="/edit-invoice-status/:id" element={<DashboardLayout><EditInvoiceStatus /></DashboardLayout>} />

          <Route path="/bills" element={<DashboardLayout><BillList /></DashboardLayout>} />
          <Route path="/add-bill" element={<DashboardLayout><AddBill /></DashboardLayout>} />
          <Route path="/bill/:id" element={<DashboardLayout><BillDetails /></DashboardLayout>} />
          <Route path="/approve-bill/:id" element={<DashboardLayout><ApproveBill /></DashboardLayout>} />

          <Route path="/payments" element={<DashboardLayout><PaymentList /></DashboardLayout>} />
          <Route path="/add-payment" element={<DashboardLayout><AddPayment /></DashboardLayout>} />

          <Route path="/expenses" element={<DashboardLayout><ExpenseList /></DashboardLayout>} />
          <Route path="/add-expense" element={<DashboardLayout><AddExpense /></DashboardLayout>} />
          <Route path="/approve-expense/:id" element={<DashboardLayout><ApproveExpense /></DashboardLayout>} />

          <Route path="/payroll" element={<DashboardLayout><PayrollList /></DashboardLayout>} />
          <Route path="/add-payroll" element={<DashboardLayout><AddPayroll /></DashboardLayout>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;