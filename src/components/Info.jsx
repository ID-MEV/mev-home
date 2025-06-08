import React from 'react';
import Time from './Time';
import WeatherSnap from './WeatherSnap';

const Info = (props) => { 
  return (
    <div id={props.id} className="info">
      <Time />
      <WeatherSnap />
    </div>
  );
};

export default Info;