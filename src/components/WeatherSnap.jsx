import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

const WeatherSnap = () => {
  const { region } = useContext(AppContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region) return;

    const fetchWeather = async () => {
      setLoading(true);
      const apiKey = '2feadd7e6a57103e581585de749141b7';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeather({
            temp: data.main.temp,
            description: data.weather[0].main,
          });
        } else {
          console.error('Failed to fetch weather:', data.message);
          setWeather(null);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [region]);

  if (!region) {
    return (
        <span className="weather">
            <i className="weather-type fa-solid fa-map-marker-alt" />
            <span className="weather-temperature-value">지역 설정 필요</span>
        </span>
    );
  }

  if (loading) {
    return (
        <span className="weather">
            <i className="weather-type fa-solid fa-spinner fa-spin" />
            <span className="weather-temperature-value">로딩중...</span>
        </span>
    );
  }

  if (!weather) {
    return (
        <span className="weather">
            <i className="weather-type fa-solid fa-exclamation-circle" />
            <span className="weather-temperature-value">날씨 정보 없음</span>
        </span>
    );
  }

  return (
    <span className="weather">
      <i className={`weather-type fa-solid ${weather.description === 'Clear' ? 'fa-sun' : 'fa-cloud'}`} />
      <span className="weather-temperature-value">{weather.temp}</span>
      <span className="weather-temperature-unit">°C</span>
      <span className="weather-region">{region}</span>
    </span>
  );
};

export default WeatherSnap;