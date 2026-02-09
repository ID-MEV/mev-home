import React from 'react';
// import useCurrentDateEffect from '../hooks/useCurrentDateEffect'; // <-- 이 줄은 주석 처리 또는 삭제합니다.
import { T } from '../utils'; // T 유틸리티 임포트

const Time = () => { // <-- ': React.FC' 부분을 삭제합니다.
  // useCurrentDateEffect 훅이 없으므로, 해당 로직을 여기에 직접 구현합니다.
  const [date, setDateTo] = React.useState(new Date()); // <-- ': Date' 부분을 삭제합니다.
  const [showColon, setShowColon] = React.useState(true); // 콜론의 보임/숨김 상태

  React.useEffect(() => {
    const halfSecond = 500; // 0.5초

    const interval = setInterval(() => {
      // 콜론 상태를 먼저 토글
      setShowColon(prev => {
        const newShowColon = !prev;
        // 콜론이 'true'가 되는 순간(나타날 때)에만 시간을 업데이트
        if (newShowColon) {
          const updatedDate = new Date(); // newDate 대신 updatedDate 변수 선언
          setDateTo(updatedDate); // updatedDate를 setDateTo에 전달
        }
        return newShowColon;
      });
    }, halfSecond);

    return () => clearInterval(interval);
  }, []); // 의존성 배열 비워둠 (컴포넌트 마운트 시 한 번만 실행)

  return (
    <div id="app-time"> {/* id 추가 (CSS 적용 위함) */}
      <div id="app-time-meridiem"> {/* PM/AM을 시간 앞으로 이동 */}
        {date.getHours() >= 12 ? "PM" : "AM"}
      </div>
      <div id="app-time-time">
        {T.formatHours(date.getHours())}<span className='time-colon' style={{ opacity: showColon ? 1 : 0 }}>:</span>{T.formatSegment(date.getMinutes())}
        <span className='time-seconds'>
          {T.formatSegment(date.getSeconds())}
        </span>
      </div>
    </div>
  );
};

export default Time;