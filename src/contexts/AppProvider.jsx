import React, { useState, useCallback } from 'react';
import { AppContext } from './AppContext';
import { UserStatus } from '../utils/types'; // UserStatus 임포트

const AppProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(UserStatus.LoggedOut);

  const setUserStatusTo = useCallback((status) => {
    setUserStatus(status);
  }, []);

  const contextValue = {
    userStatus,
    setUserStatusTo,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;