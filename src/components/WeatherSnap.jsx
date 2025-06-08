import React from 'react';
import { N } from '../utils'; // N 유틸리티 임포트

const WeatherSnap = () => { // <-- ': React.FC' 부분을 삭제합니다.
  const [temperature] = React.useState(N.rand(65, 85)); // <-- '<number>' 부분을 삭제합니다.

  return (
    <span className="weather">
      <i className="weather-type fa-solid fa-sun" /> {/* Font Awesome 아이콘 */}
      <span className="weather-temperature-value">{temperature}</span>
      <span className="weather-temperature-unit">°F</span>
    </span>
  );
};

export default WeatherSnap;