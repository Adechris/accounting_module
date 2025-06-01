import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock AuthContext for demonstration (using in-memory storage)
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'John Doe', role: 'Administrator' });
  const [token, setToken] = useState('mock-token');
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Sidebar Component
const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'employees', label: 'Employees', icon: '👥', path: '/employees' },
    { id: 'attendance', label: 'Attendance', icon: '⏰', path: '/attendance' },
    { id: 'accounts', label: 'Accounts', icon: '💰', path: '/accounts' },
    { id: 'journal', label: 'Journal Entries', icon: '📝', path: '/journal-entries' },
    { id: 'customers', label: 'Customers', icon: '🤝', path: '/customers' },
    { id: 'suppliers', label: 'Suppliers', icon: '🏢', path: '/suppliers' },
    { id: 'invoices', label: 'Invoices', icon: '🧾', path: '/invoices' },
    { id: 'bills', label: 'Bills', icon: '💳', path: '/bills' },
    { id: 'payments', label: 'Payments', icon: '💸', path: '/payments' },
    { id: 'expenses', label: 'Expenses', icon: '📉', path: '/expenses' },
    { id: 'payroll', label: 'Payroll', icon: '💵', path: '/payroll' }
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
          💼 AccuCount
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

// Topbar Component
const Topbar = () => {
  const { user, logout } = useContext(AuthContext);

  const topbarStyle = {
    height: '70px',
    backgroundColor: 'white',
    borderBottom: '1px solid #e2e8f0',
    position: 'fixed',
    top: 0,
    left: '280px',
    right: 0,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  };

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const titleStyle = {
    margin: 0,
    color: '#2d3748',
    fontWeight: '600',
    fontSize: '24px'
  };

  const dateStyle = {
    backgroundColor: '#f7fafc',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#4a5568'
  };

  const rightSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const statusBadgeStyle = {
    backgroundColor: '#e6fffa',
    color: '#00b894',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '600'
  };

  const userInfoStyle = {
    textAlign: 'right'
  };

  const usernameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748'
  };

  const roleStyle = {
    fontSize: '12px',
    color: '#718096'
  };

  const logoutButtonStyle = {
    backgroundColor: 'transparent',
    color: '#e53e3e',
    border: '1px solid #e53e3e',
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={topbarStyle}>
      {/* Search and Title Section */}
      <div style={leftSectionStyle}>
        <h3 style={titleStyle}>
          Dashboard
        </h3>
        <div style={dateStyle}>
          📅 {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* User Section */}
      <div style={rightSectionStyle}>
        <div style={statusBadgeStyle}>
          🟢 Online
        </div>
        <div style={userInfoStyle}>
          <div style={usernameStyle}>
            Welcome, {user?.username}
          </div>
          <div style={roleStyle}>
            {user?.role}
          </div>
        </div>
        <button
          style={logoutButtonStyle}
          onClick={logout}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e53e3e';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#e53e3e';
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

// Dashboard Cards Component
const DashboardCards = () => {
  const navigate = useNavigate();
  
  const cardData = [
    {
      title: 'Employees',
      description: 'Manage employee records and information',
      icon: '👥',
      count: '125',
      color: '#4299e1',
      bgColor: '#ebf8ff',
      path: '/employees'
    },
    {
      title: 'Attendance',
      description: 'Track and monitor attendance records',
      icon: '⏰',
      count: '98%',
      color: '#48bb78',
      bgColor: '#f0fff4',
      path: '/attendance'
    },
    {
      title: 'Accounts',
      description: 'Manage chart of accounts',
      icon: '💰',
      count: '45',
      color: '#ed8936',
      bgColor: '#fffaf0',
      path: '/accounts'
    },
    {
      title: 'Journal Entries',
      description: 'Record and manage journal entries',
      icon: '📝',
      count: '234',
      color: '#9f7aea',
      bgColor: '#faf5ff',
      path: '/journal-entries'
    },
    {
      title: 'Customers',
      description: 'Manage customer relationships',
      icon: '🤝',
      count: '89',
      color: '#38b2ac',
      bgColor: '#e6fffa',
      path: '/customers'
    },
    {
      title: 'Suppliers',
      description: 'Handle supplier management',
      icon: '🏢',
      count: '67',
      color: '#e53e3e',
      bgColor: '#fed7d7',
      path: '/suppliers'
    },
    {
      title: 'Invoices',
      description: 'Create and manage invoices',
      icon: '🧾',
      count: '156',
      color: '#3182ce',
      bgColor: '#bee3f8',
      path: '/invoices'
    },
    {
      title: 'Bills',
      description: 'Track and manage bills',
      icon: '💳',
      count: '78',
      color: '#d69e2e',
      bgColor: '#faf089',
      path: '/bills'
    },
    {
      title: 'Payments',
      description: 'Process and track payments',
      icon: '💸',
      count: '₦45.2K',
      color: '#38a169',
      bgColor: '#c6f6d5',
      path: '/payments'
    },
    {
      title: 'Expenses',
      description: 'Monitor business expenses',
      icon: '📉',
      count: '₦12.8K',
      color: '#e53e3e',
      bgColor: '#fed7d7',
      path: '/expenses'
    },
    {
      title: 'Payroll',
      description: 'Manage employee payroll',
      icon: '💵',
      count: '₦89.5K',
      color: '#805ad5',
      bgColor: '#e9d8fd',
      path: '/payroll'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    marginTop: '24px'
  };

  const getCardStyle = () => ({
    border: 'none',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'white',
    padding: '24px',
    height: '100%'
  });

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  };

  const getIconContainerStyle = (bgColor) => ({
    width: '56px',
    height: '56px',
    backgroundColor: bgColor,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  });

  const getBadgeStyle = (color) => ({
    backgroundColor: color,
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    padding: '6px 12px',
    borderRadius: '20px'
  });

  const cardTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '8px'
  };

  const cardDescriptionStyle = {
    color: '#718096',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '16px'
  };

  const getViewDetailsStyle = (color) => ({
    display: 'flex',
    alignItems: 'center',
    color: color,
    fontSize: '14px',
    fontWeight: '600',
    gap: '4px',
    textDecoration: 'none'
  });

  return (
    <div style={containerStyle}>
      {cardData.map((card, index) => (
        <div
          key={index}
          style={getCardStyle()}
          onClick={() => handleCardClick(card.path)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          }}
        >
          <div style={cardHeaderStyle}>
            <div style={getIconContainerStyle(card.bgColor)}>
              {card.icon}
            </div>
            <div style={getBadgeStyle(card.color)}>
              {card.count}
            </div>
          </div>
          
          <h3 style={cardTitleStyle}>
            {card.title}
          </h3>
          
          <p style={cardDescriptionStyle}>
            {card.description}
          </p>
          
          <div style={getViewDetailsStyle(card.color)}>
            <span>View Details</span>
            <span>→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component - Remove AuthProvider wrapper since it should be in App.js
const Dashboard = () => {
  const containerStyle = {
    display: 'flex',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  };

  const mainContentStyle = {
    marginLeft: '280px',
    paddingTop: '70px',
    width: 'calc(100% - 280px)',
    minHeight: '100vh'
  };

  const contentStyle = {
    padding: '32px'
  };

  const welcomeSectionStyle = {
    background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeCircle1Style = {
    position: 'absolute',
    top: '-20px',
    right: '-20px',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '50%'
  };

  const decorativeCircle2Style = {
    position: 'absolute',
    bottom: '-30px',
    left: '-30px',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '50%'
  };

  const welcomeHeaderStyle = {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '8px'
  };

  const welcomeSubtitleStyle = {
    fontSize: '18px',
    opacity: '0.9',
    marginBottom: '24px'
  };

  const statsContainerStyle = {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap'
  };

  const statItemStyle = {
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '24px',
    fontWeight: '700'
  };

  const statLabelStyle = {
    fontSize: '14px',
    opacity: '0.8'
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
      <div style={mainContentStyle}>
        <Topbar />
        <div style={contentStyle}>
          {/* Welcome Section */}
          <div style={welcomeSectionStyle}>
            <div style={decorativeCircle1Style}></div>
            <div style={decorativeCircle2Style}></div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={welcomeHeaderStyle}>
                Welcome to Your Dashboard! 🎉
              </h1>
              <p style={welcomeSubtitleStyle}>
                Manage your business operations efficiently with our comprehensive accounting system.
              </p>
              <div style={statsContainerStyle}>
                <div style={statItemStyle}>
                  <div style={statValueStyle}>₦2.4M</div>
                  <div style={statLabelStyle}>Total Revenue</div>
                </div>
                <div style={statItemStyle}>
                  <div style={statValueStyle}>125</div>
                  <div style={statLabelStyle}>Active Employees</div>
                </div>
                <div style={statItemStyle}>
                  <div style={statValueStyle}>98%</div>
                  <div style={statLabelStyle}>Attendance Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Cards */}
          <DashboardCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;