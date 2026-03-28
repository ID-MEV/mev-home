import React from 'react';
// import useCurrentDateEffect from '../hooks/useCurrentDateEffect'; // <-- 이 줄은 주석 처리 또는 삭제합니다.
import { T } from '../utils'; // T 유틸리티 임포트

const Time = () => { // <-- ': React.FC' 부분을 삭제합니다.
  // useCurrentDateEffect 훅이 없으므로, 해당 로직을 여기에 직접 구현합니다.
  const [date, setDateTo] = React.useState(new Date()); // <-- ': Date' 부분을 삭제합니다.
  const [showColon, setShowColon] = React.useState(true); // 콜론의 보임/숨김 상태

  React.useEffect(() => {
    let timeoutId; // For cleanup

    const interval = setInterval(() => {
      // 1. 매 초 정각에 시간 업데이트
      setDateTo(new Date());

      // 2. 콜론 보이게 설정
      setShowColon(true);

      // 3. 0.5초 후에 콜론 숨기기
      timeoutId = setTimeout(() => {
        setShowColon(false);
      }, 500);

    }, 1000); // 1초마다 실행

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId); // Clean up timeout as well
    };
  }, []); // 의존성 배열 비워둠 (컴포넌트 마운트 시 한 번만 실행)

  return (
    <div id="app-time"> {/* id 추가 (CSS 적용 위함) */}
      <div id="app-time-meridiem"> {/* PM/AM을 시간 앞으로 이동 */}
        {date.getHours() >= 12 ? "PM" : "AM"}
      </div>
      <div id="app-time-time" className="time-display" style={{ fontFeatureSettings: '"tnum"' }}>
        {T.formatHours(date.getHours())}

        {/* 깜박거리는 콜론과 그냥 콜론 */}
        {/* <span className='time-colon' style={{ opacity: showColon ? 1 : 0 }}>:</span> */}
        <span>:</span>
        {T.formatSegment(date.getMinutes())}
        {/* 깜박거리는 콜론과 그냥 콜론 */}
        {/* <span className='time-colon' style={{ opacity: showColon ? 1 : 0 }}>:</span> */}
        <span>:</span>
        
        <span className='time-seconds'>
          {T.formatSegment(date.getSeconds())}
        </span>
      </div>
    </div>
  );
};

export default Time;