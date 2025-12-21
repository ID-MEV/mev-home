import React, { useState, useCallback, useEffect } from 'react';
import { AppContext } from './AppContext';
import { UserStatus } from '../utils/types';

const AppProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(UserStatus.LoggedOut);
  const [region, setRegion] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(null); // 기본값: null로 초기화하여 로딩 전까지 배경을 표시하지 않음
  const [selectedThemeColor, setSelectedThemeColor] = useState('#1E4040'); // 기본 테마 색상 (나중에 DB에서 불러올 예정)

  // 앱 시작 시 서버에서 현재 배경화면 설정과 테마 색상 설정을 가져옵니다.
  useEffect(() => {
    // 배경화면 설정 로드
    fetch('https://api.mev.o-r.kr/api/settings/background')
      .then(res => res.json())
      .then(data => {
        if (data.background_image_url) {
          setSelectedBackground(data.background_image_url);
        }
      })
      .catch(err => console.error("배경화면 설정 로딩 실패:", err));

    // 테마 색상 설정 로드
    fetch('https://api.mev.o-r.kr/api/settings/theme')
      .then(res => res.json())
      .then(data => {
        if (data.theme_color) {
          setSelectedThemeColor(data.theme_color);
        }
      })
      .catch(err => console.error("테마 색상 설정 로딩 실패:", err));
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

  // 테마 색상을 변경하는 함수 (상태 업데이트 + 서버에 저장)
  const updateSelectedThemeColor = useCallback((newThemeColor) => {
    // 1. 즉시 UI에 반영
    setSelectedThemeColor(newThemeColor);

    // 2. 서버에 변경사항을 저장
    fetch('https://api.mev.o-r.kr/api/settings/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme_color: newThemeColor }),
    })
    .catch(err => console.error("테마 색상 설정 저장 실패:", err));
  }, []);

  const contextValue = {
    userStatus,
    setUserStatusTo,
    region,
    setRegionTo,
    selectedBackground,
    setSelectedBackground: updateSelectedBackground,
    selectedThemeColor,
    setSelectedThemeColor: updateSelectedThemeColor, // 이제 이 함수를 컨텍스트에 제공
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;