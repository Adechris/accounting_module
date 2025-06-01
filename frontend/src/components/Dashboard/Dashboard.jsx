// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
 
// import Topbar from '../Layout/Topbar';
 
// import Sidebar from '../Layout/Sidebar';
// import DashboardCards from './DashboardCards';
// import { AuthProvider } from '../../contexts/AuthContext';
 

// const Dashboard = () => {
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

//   const welcomeSectionStyle = {
//     background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
//     borderRadius: '20px',
//     padding: '32px',
//     marginBottom: '32px',
//     color: 'white',
//     position: 'relative',
//     overflow: 'hidden'
//   };

//   const decorativeCircle1Style = {
//     position: 'absolute',
//     top: '-20px',
//     right: '-20px',
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     borderRadius: '50%'
//   };

//   const decorativeCircle2Style = {
//     position: 'absolute',
//     bottom: '-30px',
//     left: '-30px',
//     width: '150px',
//     height: '150px',
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderRadius: '50%'
//   };

//   const welcomeHeaderStyle = {
//     fontSize: '36px',
//     fontWeight: '700',
//     marginBottom: '8px'
//   };

//   const welcomeSubtitleStyle = {
//     fontSize: '18px',
//     opacity: '0.9',
//     marginBottom: '24px'
//   };

//   const statsContainerStyle = {
//     display: 'flex',
//     gap: '24px',
//     flexWrap: 'wrap'
//   };

//   const statItemStyle = {
//     textAlign: 'center'
//   };

//   const statValueStyle = {
//     fontSize: '24px',
//     fontWeight: '700'
//   };

//   const statLabelStyle = {
//     fontSize: '14px',
//     opacity: '0.8'
//   };

//   return (
//     <AuthProvider>
//       <div style={containerStyle}>
//         <Sidebar />
//         <div style={mainContentStyle}>
//           <Topbar />
//           <div style={contentStyle}>
//             {/* Welcome Section */}
//             <div style={welcomeSectionStyle}>
//               <div style={decorativeCircle1Style}></div>
//               <div style={decorativeCircle2Style}></div>
//               <div style={{ position: 'relative', zIndex: 1 }}>
//                 <h1 style={welcomeHeaderStyle}>
//                   Welcome to Your Dashboard! 🎉
//                 </h1>
//                 <p style={welcomeSubtitleStyle}>
//                   Manage your business operations efficiently with our comprehensive accounting system.
//                 </p>
//                 <div style={statsContainerStyle}>
//                   <div style={statItemStyle}>
//                     <div style={statValueStyle}>₦2.4M</div>
//                     <div style={statLabelStyle}>Total Revenue</div>
//                   </div>
//                   <div style={statItemStyle}>
//                     <div style={statValueStyle}>125</div>
//                     <div style={statLabelStyle}>Active Employees</div>
//                   </div>
//                   <div style={statItemStyle}>
//                     <div style={statValueStyle}>98%</div>
//                     <div style={statLabelStyle}>Attendance Rate</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Dashboard Cards */}
//             <DashboardCards />
//           </div>
//         </div>
//       </div>
//     </AuthProvider>
//   );
// };

// export default Dashboard;





import React from 'react';
import DashboardCards from './DashboardCards';

const Dashboard = () => {
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
    <>
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
    </>
  );
};

export default Dashboard;