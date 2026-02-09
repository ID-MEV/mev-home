import React from 'react';
import Time from './Time';
import WeatherSnap from './WeatherSnap';

const Info = (props) => { 
  return (
    <div id={props.id} className="info">
      <div className="info-time-wrapper">
        <Time />
      </div>
      <div className="info-weather-wrapper">
        <WeatherSnap />
      </div>
    </div>
  );
};

export default Info;