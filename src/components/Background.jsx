// src/components/Background.jsx
import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { UserStatus } from '../utils/types';

const Background = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    console.warn("Background must be used within an AppProvider");
    return null;
  }

  // 배경 클릭 시 동작을 제거하므로 handleOnClick 함수는 더 이상 필요 없습니다.
  // const { userStatus, setUserStatusTo } = context;
  // const handleOnClick = () => {
  //   if (userStatus === UserStatus.LoggedOut) {
  //     setUserStatusTo(UserStatus.LoggingIn);
  //   }
  // };

  return (
    // onClick 속성을 삭제합니다.
    <div id="app-background">
      <div id="app-background-image" className="background-image" />
    </div>
  );
};

export default Background;