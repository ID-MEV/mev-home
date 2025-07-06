// src/App.jsx
import React, { useState, useCallback, useContext, useEffect } from 'react'; // useEffect 추가
import Pin from './components/Pin';
import Loading from './components/Loading';
import Background from './components/Background';
import UserStatusButton from './components/UserStatusButton';
import Info from './components/Info';
import { AppContext } from './contexts/AppContext';
import { UserStatus } from './utils/types';
import classNames from 'classnames';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  const { userStatus, setUserStatusTo } = useContext(AppContext);

  const getStatusClass = useCallback(() => {
    switch (userStatus) {
      case UserStatus.LoggedOut:
        return 'logged-out';
      case UserStatus.LoggingIn:
        return 'logging-in';
      case UserStatus.VerifyingLogin:
        return 'verifying-log-in';
      case UserStatus.LoginError:
        return 'log-in-error';
      case UserStatus.LoggedIn:
        return 'logged-in';
      default:
        return '';
    }
  }, [userStatus]);

  // --- 새로 추가된 부분 시작 ---
  React.useEffect(() => {
    const handleInitialKeyPress = (event) => {
      // 현재 상태가 'LoggedOut'일 때만 키보드 이벤트에 반응
      if (userStatus === UserStatus.LoggedOut) {
        // '1' 키가 눌렸을 때 UserStatus를 'LoggingIn'으로 변경
        if (event.key === '1') {
          setUserStatusTo(UserStatus.LoggingIn);
          event.preventDefault(); // 기본 브라우저 동작 방지 (예: 숫자 1이 입력될 수 있는 경우)
        }
      }
    };

    // 문서 전체에 키다운 이벤트 리스너 추가
    document.addEventListener('keydown', handleInitialKeyPress);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('keydown', handleInitialKeyPress);
    };
  }, [userStatus, setUserStatusTo]); // userStatus와 setUserStatusTo가 변경될 때만 리스너 재등록
  // --- 새로 추가된 부분 끝 ---

  return (
    <div id="app" className={getStatusClass()}>
      <Background />
      {userStatus === UserStatus.LoggedOut && (
        <div id="sign-in-button-wrapper">
          <UserStatusButton
            id="sign-in-button"
            userStatus={UserStatus.LoggingIn}
            icon="fa-solid fa-power-off"
          />
        </div>
      )}
      <Info id="app-info"/>
      {/* Pin 컴포넌트는 LoggingIn 또는 LogInError 상태일 때만 렌더링되도록 조건부 추가 */}
      {(userStatus === UserStatus.LoggingIn || userStatus === UserStatus.LogInError) && <Pin />}
      {userStatus === UserStatus.VerifyingLogin && <Loading />}
      {userStatus === UserStatus.LoggedIn && <Dashboard />}
    </div>
  );
};

export default App;