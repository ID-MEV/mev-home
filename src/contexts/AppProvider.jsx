import React, { useState, useCallback, useEffect } from 'react';
import { AppContext } from './AppContext';
import { UserStatus } from '../utils/types';

const AppProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(UserStatus.LoggedOut);
  const [region, setRegion] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('/backgrounds/main1.jpeg'); // 기본값

  // 앱 시작 시 서버에서 현재 배경화면 설정을 가져옵니다.
  useEffect(() => {
    fetch('https://api.mev.o-r.kr/api/settings/background')
      .then(res => res.json())
      .then(data => {
        if (data.background_image_url) {
          setSelectedBackground(data.background_image_url);
        }
      })
      .catch(err => console.error("배경화면 설정 로딩 실패:", err));
  }, []);

  const setUserStatusTo = useCallback((status) => {
    setUserStatus(status);
  }, []);

  const setRegionTo = useCallback((newRegion) => {
    setRegion(newRegion);
  }, []);

  // 배경화면을 변경하는 함수 (상태 업데이트 + 서버에 저장)
  const updateSelectedBackground = useCallback((newBackground) => {
    // 1. 즉시 UI에 반영
    setSelectedBackground(newBackground);

    // 2. 서버에 변경사항을 저장
    fetch('https://api.mev.o-r.kr/api/settings/background', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ background_image_url: newBackground }),
    })
    .catch(err => console.error("배경화면 설정 저장 실패:", err));
  }, []);

  const contextValue = {
    userStatus,
    setUserStatusTo,
    region,
    setRegionTo,
    selectedBackground,
    setSelectedBackground: updateSelectedBackground, // 이제 이 함수를 컨텍스트에 제공
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;