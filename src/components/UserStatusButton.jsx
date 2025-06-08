import React from 'react';
import { AppContext } from '../contexts/AppContext';
// import type { IUserStatusButton } from '../utils/types'; // <-- 이 줄은 완전히 삭제합니다.

const UserStatusButton = ( // <-- ': React.FC<IUserStatusButton>' 부분을 삭제합니다.
  props // <-- ': IUserStatusButton' 부분을 삭제합니다.
) => {
  const context = React.useContext(AppContext);

  if (!context) {
    // AppContext를 사용하려면 <AppProvider>로 감싸야 합니다.
    console.warn("UserStatusButton must be used within an AppProvider");
    return null; // context가 없으면 아무것도 렌더링하지 않음
  }

  const { userStatus, setUserStatusTo } = context;

  const handleOnClick = () => { // <-- ': void' 부분을 삭제합니다.
    setUserStatusTo(props.userStatus);
  };

  return (
    <button
      id={props.id}
      className="user-status-button clear-button"
      disabled={userStatus === props.userStatus}
      type="button"
      onClick={handleOnClick}
    >
      <i className={props.icon} />
    </button>
  );
};

export default UserStatusButton;