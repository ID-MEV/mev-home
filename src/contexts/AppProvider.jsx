import React, { useState, useCallback } from 'react';
import { AppContext } from './AppContext';
import { UserStatus } from '../utils/types'; // UserStatus 임포트

const AppProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(UserStatus.LoggedOut);
  const [region, setRegion] = useState(''); // 지역 상태 추가

  const setUserStatusTo = useCallback((status) => {
    setUserStatus(status);
  }, []);

  // 지역 설정 함수 추가
  const setRegionTo = useCallback((newRegion) => {
    setRegion(newRegion);
  }, []);

  const contextValue = {
    userStatus,
    setUserStatusTo,
    region, // context에 추가
    setRegionTo, // context에 추가
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;