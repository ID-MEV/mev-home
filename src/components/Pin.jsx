import React from 'react';
import { AppContext } from '../contexts/AppContext';
import { UserStatus } from '../utils/types';
import { LogInUtility } from '../utils'; // LogInUtility 임포트
import PinDigit from './PinDigit';

const Pin = () => { // <-- ': React.FC' 부분을 삭제합니다.
  const context = React.useContext(AppContext);

  if (!context) {
    // AppContext를 사용하려면 <AppProvider>로 감싸야 합니다.
    console.warn("Pin must be used within an AppProvider");
    return null; // context가 없으면 아무것도 렌더링하지 않음
  }

  const { userStatus, setUserStatusTo } = context;

  const [pin, setPinTo] = React.useState(""); // <-- '<string>' 부분을 삭제합니다.

  const ref = React.useRef(null); // <-- '<HTMLInputElement>' 부분을 삭제합니다.

  React.useEffect(() => {
    if (
      userStatus === UserStatus.LoggingIn ||
      userStatus === UserStatus.LogInError
    ) {
      ref.current?.focus();
    } else {
      setPinTo("");
    }
  }, [userStatus]);

  React.useEffect(() => {
    if (pin.length === 4) {
      const verify = async () => { // <-- ': Promise<void>' 부분을 삭제합니다.
        try {
          setUserStatusTo(UserStatus.VerifyingLogIn);

          if (await LogInUtility.verify(pin)) {
            setUserStatusTo(UserStatus.LoggedIn);
          }
        } catch (err) {
          console.error(err);
          setUserStatusTo(UserStatus.LogInError);
        }
      };
      verify();
    }

    if (userStatus === UserStatus.LogInError && pin.length < 4) {
      setUserStatusTo(UserStatus.LoggingIn);
    }

  }, [pin, userStatus, setUserStatusTo]);

  const handleOnClick = () => { // <-- ': void' 부분을 삭제합니다.
    ref.current?.focus();
  };

  const handleOnCancel = () => { // <-- ': void' 부분을 삭제합니다.
    setUserStatusTo(UserStatus.LoggedOut);
  };

  // e: React.ChangeEvent<HTMLInputElement> -> e (타입 제거)
  const handleOnChange = (e) => { // <-- ': React.ChangeEvent<HTMLInputElement>' 와 ': void' 부분을 삭제합니다.
    if (e.target.value.length <= 4) {
      setPinTo(e.target.value);
    }
  };

  const getCancelText = () => { // <-- ': React.JSX.Element' 부분을 삭제합니다.
    return (
      <span id="app-pin-cancel-text" onClick={handleOnCancel}>
        Cancel
      </span>
    );
  };

  const getErrorText = () => { // <-- ': React.JSX.Element | null' 부분을 삭제합니다.
    if (userStatus === UserStatus.LogInError) {
      return <span id="app-pin-error-text">Invalid</span>;
    }
    return null;
  };

  return (
    <div id="app-pin-wrapper">
      <input
        disabled={
          userStatus !== UserStatus.LoggingIn &&
          userStatus !== UserStatus.LogInError
        }
        id="app-pin-hidden-input"
        maxLength={4}
        ref={ref}
        type="number"
        value={pin}
        onChange={handleOnChange}
      />
      <div id="app-pin" onClick={handleOnClick}>
        <PinDigit focused={pin.length === 0} value={pin[0]} />
        <PinDigit focused={pin.length === 1} value={pin[1]} />
        <PinDigit focused={pin.length === 2} value={pin[2]} />
        <PinDigit focused={pin.length === 3} value={pin[3]} />
      </div>
      <h3 id="app-pin-label">
        Enter PIN 1234 (임시 비밀번호) {getErrorText()} {getCancelText()}
      </h3>
    </div>
  );
};

export default Pin;