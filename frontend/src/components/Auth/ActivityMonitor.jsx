import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const ActivityMonitor = ({ children }) => {
  const { handleActivity, token } = useContext(AuthContext);

  useEffect(() => {
    // Only set up activity monitoring if user is authenticated
    if (!token) return;

    // List of events that indicate user activity
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'keydown'
    ];

    // Throttle activity detection to avoid excessive calls
    let activityTimeout;
    const throttledHandleActivity = () => {
      if (activityTimeout) return;
      
      activityTimeout = setTimeout(() => {
        handleActivity();
        activityTimeout = null;
      }, 1000); // Throttle to once per second
    };

    // Add event listeners
    const addEventListeners = () => {
      activityEvents.forEach(event => {
        document.addEventListener(event, throttledHandleActivity, true);
      });
    };

    // Remove event listeners
    const removeEventListeners = () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, throttledHandleActivity, true);
      });
    };

    // Set up listeners
    addEventListeners();

    // Handle visibility change (user switches tabs/windows)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      removeEventListeners();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }
    };
  }, [handleActivity, token]);

  return <>{children}</>;
};

export default ActivityMonitor;