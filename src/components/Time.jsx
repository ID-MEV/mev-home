import React from 'react';
// import useCurrentDateEffect from '../hooks/useCurrentDateEffect'; // <-- 이 줄은 주석 처리 또는 삭제합니다.
import { T } from '../utils'; // T 유틸리티 임포트

const Time = () => { // <-- ': React.FC' 부분을 삭제합니다.
  // useCurrentDateEffect 훅이 없으므로, 해당 로직을 여기에 직접 구현합니다.
  const [date, setDateTo] = React.useState(new Date()); // <-- ': Date' 부분을 삭제합니다.

  React.useEffect(() => {
    const fiveSeconds = 5000; // 5초마다 시간 업데이트
    const interval = setInterval(() => {
      setDateTo(new Date());
    }, fiveSeconds);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="app-time"> {/* id 추가 (CSS 적용 위함) */}
      <div id="app-time-time">
        {T.formatHours(date.getHours())}:{T.formatSegment(date.getMinutes())}
      </div>
      <div id="app-time-meridiem">
        {date.getHours() >= 12 ? "PM" : "AM"}
      </div>
    </div>
  );
};

export default Time;