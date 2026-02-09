import React, { useState, useCallback, useEffect } from 'react';
import { AppContext } from './AppContext';
import { UserStatus } from '../utils/types';

const AppProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(UserStatus.LoggedOut);
  const [region, setRegion] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(null); // 기본값: null로 초기화하여 로딩 전까지 배경을 표시하지 않음
  const [selectedThemeColor, setSelectedThemeColor] = useState('#1E4040'); // 기본 테마 색상 (나중에 DB에서 불러올 예정)
  const [weatherLocation, setWeatherLocation] = useState('Seoul'); // 날씨 위치 설정 (기본값 서울)
  const [weatherUnit, setWeatherUnit] = useState('celsius'); // 날씨 단위 설정 (기본값 섭씨)

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

    // 날씨 설정 로드
    fetch('https://api.mev.o-r.kr/api/weather/settings')
      .then(res => res.json())
      .then(data => {
        if (data.weather_location) {
          setWeatherLocation(data.weather_location);
        }
        if (data.weather_unit) {
          setWeatherUnit(data.weather_unit);
        }
      })
      .catch(err => console.error("날씨 설정 로딩 실패:", err));
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

  // 날씨 위치를 변경하는 함수 (상태 업데이트 + 서버에 저장)
  const updateWeatherLocation = useCallback((newLocation) => {
    // 1. 즉시 UI에 반영
    setWeatherLocation(newLocation);

    // 2. 서버에 변경사항을 저장
    fetch('https://api.mev.o-r.kr/api/weather/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weather_location: newLocation }),
    })
    .catch(err => console.error("날씨 위치 설정 저장 실패:", err));
  }, []);

  // 날씨 단위를 변경하는 함수 (상태 업데이트 + 서버에 저장)
  const updateWeatherUnit = useCallback((newUnit) => {
    // 1. 즉시 UI에 반영
    setWeatherUnit(newUnit);

    // 2. 서버에 변경사항을 저장
    fetch('https://api.mev.o-r.kr/api/weather/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weather_unit: newUnit }),
    })
    .catch(err => console.error("날씨 단위 설정 저장 실패:", err));
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
    weatherLocation,
    setWeatherLocation: updateWeatherLocation,
    weatherUnit,
    setWeatherUnit: updateWeatherUnit,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;