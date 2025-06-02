-- Create Database
USE accounting_system;

-- 1. Employees Table (HR/Payroll Information)
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'USA',
    department VARCHAR(50),
    position VARCHAR(100),
    salary DECIMAL(10,2),
    hourly_rate DECIMAL(8,2),
    hire_date DATE NOT NULL,
    termination_date DATE NULL,
    employment_type ENUM('full_time', 'part_time', 'contract', 'intern') DEFAULT 'full_time',
    status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Users Table (System Access/Authentication)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'accountant', 'hr', 'manager', 'employee', 'client', 'external') DEFAULT 'employee',
    employee_id INT NULL, -- Only for internal employees, NULL for external users
    first_name VARCHAR(50), -- For non-employee users
    last_name VARCHAR(50), -- For non-employee users
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

ALTER TABLE users 
ADD COLUMN reset_token VARCHAR(255) NULL,
ADD COLUMN reset_token_expiry DATETIME NULL;

-- 3. Chart of Accounts (Account Categories)
CREATE TABLE chart_of_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_code VARCHAR(10) UNIQUE NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    account_type ENUM('asset', 'liability', 'equity', 'revenue', 'expense') NOT NULL,
    account_subtype VARCHAR(50),
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES chart_of_accounts(id)
);

-- 4. Bank Accounts (Moved before payments table)
CREATE TABLE bank_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    bank_branch VARCHAR(100),
    routing_number VARCHAR(20),
    account_type ENUM('checking', 'savings', 'credit', 'money_market', 'other') NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    opening_balance DECIMAL(15,2) DEFAULT 0,
    current_balance DECIMAL(15,2) DEFAULT 0,
    chart_account_id INT,
    status ENUM('active', 'inactive', 'closed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (chart_account_id) REFERENCES chart_of_accounts(id)
);

-- 5. Customers Table
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_code VARCHAR(20) UNIQUE NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    mobile VARCHAR(15),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'USA',
    credit_limit DECIMAL(15,2) DEFAULT 0,
    payment_terms VARCHAR(50) DEFAULT 'Net 30',
    tax_id VARCHAR(50),
    website VARCHAR(100),
    account_manager INT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_manager) REFERENCES employees(id) ON DELETE SET NULL
);

-- 6. Suppliers/Vendors Table
CREATE TABLE suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_code VARCHAR(20) UNIQUE NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    mobile VARCHAR(15),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    postal_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'USA',
    payment_terms VARCHAR(50) DEFAULT 'Net 30',
    tax_id VARCHAR(50),
    website VARCHAR(100),
    account_manager INT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_manager) REFERENCES employees(id) ON DELETE SET NULL
);

-- 7. Invoices (Sales)
CREATE TABLE invoices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    subtotal DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,4) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    discount_rate DECIMAL(5,4) DEFAULT 0,
    discount_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_due DECIMAL(15,2) NOT NULL,
    status ENUM('draft', 'sent', 'partial_payment', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
    payment_status ENUM('unpaid', 'partial', 'paid') DEFAULT 'unpaid',
    terms_conditions TEXT,
    notes TEXT,
    created_by INT NOT NULL,
    approved_by INT NULL,
    sent_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 8. Invoice Items
CREATE TABLE invoice_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_id INT NOT NULL,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    discount_rate DECIMAL(5,4) DEFAULT 0,
    total_price DECIMAL(15,2) NOT NULL,
    account_id INT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id)
);

-- 9. Bills/Purchase Orders
CREATE TABLE bills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_number VARCHAR(20) UNIQUE NOT NULL,
    supplier_id INT NOT NULL,
    bill_date DATE NOT NULL,
    due_date DATE NOT NULL,
    po_number VARCHAR(20),
    subtotal DECIMAL(15,2) NOT NULL,
    tax_rate DECIMAL(5,4) DEFAULT 0,
    tax_amount DECIMAL(15,2) DEFAULT 0,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    balance_due DECIMAL(15,2) NOT NULL,
    status ENUM('draft', 'pending_approval', 'approved', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
    payment_status ENUM('unpaid', 'partial', 'paid') DEFAULT 'unpaid',
    notes TEXT,
    created_by INT NOT NULL,
    approved_by INT NULL,
    received_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 10. Bill Items
CREATE TABLE bill_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bill_id INT NOT NULL,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(15,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    account_id INT NULL,
    FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id)
);

-- 11. Journal Entries (Main Accounting Transactions)
CREATE TABLE journal_entries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entry_number VARCHAR(20) UNIQUE NOT NULL,
    entry_date DATE NOT NULL,
    description TEXT NOT NULL,
    reference VARCHAR(50),
    total_debit DECIMAL(15,2) NOT NULL,
    total_credit DECIMAL(15,2) NOT NULL,
    created_by INT NOT NULL,
    approved_by INT NULL,
    status ENUM('draft', 'pending_approval', 'approved', 'posted', 'cancelled') DEFAULT 'draft',
    posted_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 12. Journal Entry Details (Individual Debit/Credit Lines)
CREATE TABLE journal_entry_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    journal_entry_id INT NOT NULL,
    account_id INT NOT NULL,
    description TEXT,
    debit_amount DECIMAL(15,2) DEFAULT 0,
    credit_amount DECIMAL(15,2) DEFAULT 0,
    FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id)
);

-- 13. Payments (Both Received and Made) - Fixed
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    payment_number VARCHAR(20) UNIQUE NOT NULL,
    payment_type ENUM('received', 'made') NOT NULL,
    customer_id INT NULL,
    supplier_id INT NULL,
    invoice_id INT NULL,
    bill_id INT NULL,
    payment_date DATE NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_method ENUM('cash', 'check', 'bank_transfer', 'credit_card', 'wire_transfer', 'other') NOT NULL,
    bank_account_id INT NULL,
    check_number VARCHAR(20),
    reference VARCHAR(100),
    memo TEXT,
    status ENUM('pending', 'cleared', 'bounced', 'cancelled') DEFAULT 'cleared',
    created_by INT NOT NULL,
    approved_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    FOREIGN KEY (bill_id) REFERENCES bills(id),
    FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 14. Expenses Table
CREATE TABLE expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    expense_number VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    description TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    expense_date DATE NOT NULL,
    payment_method ENUM('cash', 'check', 'bank_transfer', 'credit_card', 'petty_cash', 'other') NOT NULL,
    receipt_number VARCHAR(50),
    employee_id INT,
    account_id INT NOT NULL,
    supplier_id INT NULL,
    project_id INT NULL,
    is_reimbursable BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'submitted', 'approved', 'paid', 'rejected') DEFAULT 'draft',
    created_by INT NOT NULL,
    approved_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 15. Attendance Table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    break_duration INT DEFAULT 0,
    total_hours DECIMAL(4,2) DEFAULT 0,
    overtime_hours DECIMAL(4,2) DEFAULT 0,
    status ENUM('present', 'absent', 'half_day', 'late', 'holiday', 'sick_leave') DEFAULT 'present',
    notes TEXT,
    approved_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE KEY unique_employee_date (employee_id, date)
);

-- 16. Payroll Table
CREATE TABLE payroll (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    regular_hours DECIMAL(5,2) DEFAULT 0,
    overtime_hours DECIMAL(5,2) DEFAULT 0,
    holiday_hours DECIMAL(5,2) DEFAULT 0,
    sick_hours DECIMAL(5,2) DEFAULT 0,
    vacation_hours DECIMAL(5,2) DEFAULT 0,
    gross_pay DECIMAL(10,2) NOT NULL,
    federal_tax DECIMAL(10,2) DEFAULT 0,
    state_tax DECIMAL(10,2) DEFAULT 0,
    social_security DECIMAL(10,2) DEFAULT 0,
    medicare DECIMAL(10,2) DEFAULT 0,
    health_insurance DECIMAL(10,2) DEFAULT 0,
    retirement_401k DECIMAL(10,2) DEFAULT 0,
    other_deductions DECIMAL(10,2) DEFAULT 0,
    net_pay DECIMAL(10,2) NOT NULL,
    payment_date DATE,
    payment_method ENUM('direct_deposit', 'check', 'cash') DEFAULT 'direct_deposit',
    status ENUM('draft', 'calculated', 'approved', 'paid') DEFAULT 'draft',
    created_by INT NOT NULL,
    approved_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- 17. Tax Rates Table
CREATE TABLE tax_rates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tax_name VARCHAR(50) NOT NULL,
    tax_type ENUM('sales', 'income', 'payroll', 'other') NOT NULL,
    rate DECIMAL(5,4) NOT NULL,
    jurisdiction VARCHAR(50),
    effective_date DATE NOT NULL,
    expiry_date DATE NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 18. Audit Trail Table
CREATE TABLE audit_trail (
    id INT PRIMARY KEY AUTO_INCREMENT,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    user_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Simplified Additional Tables for Accounting System

-- 19. Departments Table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    department_code VARCHAR(10) UNIQUE NOT NULL,
    manager_id INT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- 20. Notifications Table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 21. Budgets Table
CREATE TABLE budgets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    budget_name VARCHAR(100) NOT NULL,
    department_id INT NULL,
    account_id INT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    budgeted_amount DECIMAL(15,2) NOT NULL,
    actual_amount DECIMAL(15,2) DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 22. Assets Table
CREATE TABLE assets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    asset_name VARCHAR(100) NOT NULL,
    asset_tag VARCHAR(20) UNIQUE NOT NULL,
    category ENUM('equipment', 'furniture', 'vehicle', 'software', 'other') NOT NULL,
    purchase_date DATE NOT NULL,
    purchase_price DECIMAL(15,2) NOT NULL,
    current_value DECIMAL(15,2),
    department_id INT NULL,
    assigned_to INT NULL,
    status ENUM('active', 'inactive', 'disposed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES employees(id) ON DELETE CASCADE
);

-- Update existing employees table to reference departments
ALTER TABLE employees 
ADD COLUMN department_id INT NULL AFTER department,
ADD FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE;

-- Essential indexes only
CREATE INDEX idx_departments_manager ON departments(manager_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_budgets_department ON budgets(department_id);
CREATE INDEX idx_budgets_period ON budgets(period_start, period_end);
CREATE INDEX idx_assets_department ON assets(department_id);
CREATE INDEX idx_assets_assigned ON assets(assigned_to);
 
-- Create Indexes for Better Performance
CREATE INDEX idx_employees_employee_id ON employees(employee_id);
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_employee_id ON users(employee_id);
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX idx_attendance_status ON attendance(status);
CREATE INDEX idx_journal_entries_date ON journal_entries(entry_date);
CREATE INDEX idx_journal_entries_status ON journal_entries(status);
CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_date ON invoices(invoice_date);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_bills_supplier ON bills(supplier_id);
CREATE INDEX idx_bills_date ON bills(bill_date);
CREATE INDEX idx_bills_status ON bills(status);
CREATE INDEX idx_payments_date ON payments(payment_date);
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_employee ON expenses(employee_id);
CREATE INDEX idx_payroll_employee ON payroll(employee_id);
CREATE INDEX idx_payroll_period ON payroll(pay_period_start, pay_period_end);
CREATE INDEX idx_audit_trail_table ON audit_trail(table_name, record_id);
CREATE INDEX idx_audit_trail_user ON audit_trail(user_id);
CREATE INDEX idx_audit_trail_timestamp ON audit_trail(timestamp);

 