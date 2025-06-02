import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
const [activeItem, setActiveItem] = useState('dashboard');
const navigate = useNavigate();

const menuItems = [
 { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
 { id: 'employees', label: 'Employees', icon: '👥', path: '/employees' },
 { id: 'departments', label: 'Departments', icon: '🏛️', path: '/departments' },
 { id: 'users', label: 'Users', icon: '👤', path: '/users' },
 { id: 'attendance', label: 'Attendance', icon: '⏰', path: '/attendance' },
 { id: 'accounts', label: 'Accounts', icon: '💰', path: '/accounts' },
 { id: 'journal', label: 'Journal Entries', icon: '📝', path: '/journal-entries' },
 { id: 'customers', label: 'Customers', icon: '🤝', path: '/customers' },
 { id: 'suppliers', label: 'Suppliers', icon: '🏢', path: '/suppliers' },
 { id: 'invoices', label: 'Invoices', icon: '🧾', path: '/invoices' },
 { id: 'bills', label: 'Bills', icon: '💳', path: '/bills' },
 { id: 'payments', label: 'Payments', icon: '💸', path: '/payments' },
 { id: 'expenses', label: 'Expenses', icon: '📉', path: '/expenses' },
 { id: 'assets', label: 'Assets', icon: '🏗️', path: '/assets' },
 { id: 'budgets', label: 'Budgets', icon: '📋', path: '/budgets' },
 { id: 'payroll', label: 'Payroll', icon: '💵', path: '/payroll' },
 { id: 'notifications', label: 'Notifications', icon: '🔔', path: '/notifications' }
 ];

const handleNavigation = (item) => {
setActiveItem(item.id);
navigate(item.path);
 };

const sidebarStyle = {
width: '280px',
height: '100vh',
backgroundColor: '#1a1d29',
color: 'white',
position: 'fixed',
left: 0,
top: 0,
zIndex: 1000,
paddingTop: '20px',
overflowY: 'auto',
boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
fontFamily: 'Arial, sans-serif'
 };

const logoSectionStyle = {
padding: '0 24px 32px 24px',
borderBottom: '1px solid #2d3748'
 };

const logoStyle = {
color: '#4299e1',
fontWeight: 'bold',
fontSize: '24px',
margin: 0,
textAlign: 'center'
 };

const logoSubtitleStyle = {
color: '#a0aec0',
fontSize: '14px',
textAlign: 'center',
margin: '4px 0 0 0'
 };

const navStyle = {
padding: '24px 0'
 };

const getMenuItemStyle = (isActive) => ({
padding: '12px 24px',
cursor: 'pointer',
backgroundColor: isActive ? '#2d3748' : 'transparent',
borderLeft: isActive ? '4px solid #4299e1' : '4px solid transparent',
transition: 'all 0.3s ease',
display: 'flex',
alignItems: 'center',
gap: '12px'
 });

const getMenuTextStyle = (isActive) => ({
fontSize: '15px',
fontWeight: isActive ? '600' : '400',
color: isActive ? '#e2e8f0' : '#a0aec0'
 });

return (
<div style={sidebarStyle}>
{/* Logo Section */}
<div style={logoSectionStyle}>
<h4 style={logoStyle}>
 💼 Business Toolbox
</h4>
<p style={logoSubtitleStyle}>
 Accounting System
</p>
</div>

{/* Navigation Menu */}
<nav style={navStyle}>
{menuItems.map((item) => (
<div
key={item.id}
onClick={() => handleNavigation(item)}
style={getMenuItemStyle(activeItem === item.id)}
onMouseEnter={(e) => {
if (activeItem !== item.id) {
e.target.style.backgroundColor = '#2d3748';
 }
 }}
onMouseLeave={(e) => {
if (activeItem !== item.id) {
e.target.style.backgroundColor = 'transparent';
 }
 }}
>
<span style={{ fontSize: '20px' }}>{item.icon}</span>
<span style={getMenuTextStyle(activeItem === item.id)}>
{item.label}
</span>
</div>
 ))}
</nav>
</div>
 );
 };

export default Sidebar