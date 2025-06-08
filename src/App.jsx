// src/App.jsx
import React, { useState, useCallback, useContext } from 'react';
import Pin from './components/Pin';
import Loading from './components/Loading';
import Background from './components/Background';
import UserStatusButton from './components/UserStatusButton';
import Info from './components/Info';
import { AppContext } from './contexts/AppContext';
import { UserStatus } from './utils/types';
import classNames from 'classnames';

const App = () => {
  const { userStatus, setUserStatusTo } = useContext(AppContext);

  // AppProvider의 userStatus에 따라 .logged-out, .logging-in 등의 클래스를 #app에 적용합니다.
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

  return (
    <div id="app" className={getStatusClass()}> {/* className을 수정하여 `App` 클래스 없이 상태 클래스만 적용 */}
      <Background />
      {/* 로그인 버튼이 로그인 상태에 따라 보여야 하므로 조건부 렌더링 추가 */}
      {userStatus === UserStatus.LoggedOut && (
        <div id="sign-in-button-wrapper"> {/* scss에 정의된 wrapper div 추가 */}
            <UserStatusButton
                id="sign-in-button" // scss의 #sign-in-button에 대응
                userStatus={UserStatus.LoggingIn} // 클릭 시 LoggingIn 상태로 전환
                icon="fa-solid fa-power-off" // 전원 아이콘 (또는 원하는 아이콘)
            />
        </div>
      )}
      <Info id="app-info"/>
      <Pin />
      {userStatus === UserStatus.VerifyingLogin && <Loading />} {/* Loading은 verifying-log-in 상태일 때 보임 */}
    </div>
  );
};

export default App;