// import React from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';

// const DashboardLayout = ({ children }) => {
//   const containerStyle = {
//     display: 'flex',
//     backgroundColor: '#f8fafc',
//     minHeight: '100vh',
//     fontFamily: 'Arial, sans-serif'
//   };

//   const mainContentStyle = {
//     marginLeft: '280px',
//     paddingTop: '70px',
//     width: 'calc(100% - 280px)',
//     minHeight: '100vh'
//   };

//   const contentStyle = {
//     padding: '32px'
//   };

//   return (
//     <div style={containerStyle}>
//       <Sidebar />
//       <div style={mainContentStyle}>
//         <Topbar />
//         <div style={contentStyle}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ActivityMonitor from '../Auth/ActivityMonitor';
import SessionWarningModal from '../Auth/SessionWarningModal';

const DashboardLayout = ({ children }) => {
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

  return (
    <ActivityMonitor>
      <div style={containerStyle}>
        <Sidebar />
        <div style={mainContentStyle}>
          <Topbar />
          <div style={contentStyle}>
            {children}
          </div>
        </div>
      </div>
      
      {/* Session Warning Modal */}
      <SessionWarningModal />
    </ActivityMonitor>
  );
};

export default DashboardLayout;