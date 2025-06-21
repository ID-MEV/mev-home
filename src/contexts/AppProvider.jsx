import React, { useState, useCallback } from 'react';
import { AppContext } from './AppContext';
import { UserStatus } from '../utils/types'; // UserStatus 임포트

const AppProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(UserStatus.LoggedOut);
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80');

  const setUserStatusTo = useCallback((status) => {
    setUserStatus(status);
  }, []);

  const changeBackground = useCallback((imageUrl) => {
    setBackgroundImage(imageUrl);
  }, []);

  const contextValue = {
    userStatus,
    setUserStatusTo,
    backgroundImage,
    changeBackground,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;