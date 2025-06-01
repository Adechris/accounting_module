import React from 'react'
import { useNavigate } from 'react-router-dom';

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
export default DashboardCards