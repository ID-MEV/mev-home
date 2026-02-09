import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';

const cityCoordinates = {
  seoul: { latitude: 37.5665, longitude: 126.9780 },
  incheon: { latitude: 37.4563, longitude: 126.7052 },
  gwangju: { latitude: 35.1595, longitude: 126.8526 },
  busan: { latitude: 35.1796, longitude: 129.0756 },
  daegu: { latitude: 35.8714, longitude: 128.6014 },
  'new york': { latitude: 40.7128, longitude: -74.0060 },
  london: { latitude: 51.5074, longitude: -0.1278 },
};

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const WeatherSnap = () => {
  const { weatherLocation, weatherUnit } = useContext(AppContext);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!weatherLocation) return;

    const fetchWeather = async () => {
      setLoading(true);

      const normalizedLocation = weatherLocation.toLowerCase();
      const coords = cityCoordinates[normalizedLocation];

      if (!coords) {
        console.error(`Unknown weather location: ${weatherLocation}`);
        setWeather(null);
        setLoading(false);
        return;
      }

      const { latitude, longitude } = coords;
      const unitParam = weatherUnit === 'celsius' ? 'celsius' : 'fahrenheit';

      const url = `${OPEN_METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode,is_day&temperature_unit=${unitParam}&forecast_days=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.current) {
          setWeather({
            temp: data.current.temperature_2m,
            unit: unitParam,
            location: weatherLocation,
            weathercode: data.current.weathercode,
            is_day: data.current.is_day,
          });
        } else {
          console.error('Failed to fetch weather from Open-Meteo API:', data.reason || data.error || 'Unknown error');
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
  }, [weatherLocation, weatherUnit]); // weatherLocation 또는 weatherUnit이 변경될 때마다 다시 호출

  // 날씨 아이콘 매핑 함수 (Open-Meteo Weather codes 사용)
  // 참고: https://open-meteo.com/en/docs/weather-api
  const getWeatherIcon = (weathercode, isDay) => {
    switch (weathercode) {
      case 0: return isDay ? 'fa-sun' : 'fa-moon'; // Clear sky (낮/밤 구분)
      case 1: return isDay ? 'fa-cloud-sun' : 'fa-cloud-moon'; // Mainly clear
      case 2: return 'fa-cloud-sun'; // Partly cloudy
      case 3: return 'fa-cloud'; // Overcast
      case 45: return 'fa-smog'; // Fog
      case 48: return 'fa-smog'; // Depositing rime fog
      case 51: // Drizzle: Light
      case 53: // Drizzle: Moderate
      case 55: return 'fa-cloud-showers-heavy'; // Drizzle: Dense intensity
      case 56: // Freezing Drizzle: Light
      case 57: return 'fa-cloud-showers-heavy'; // Freezing Drizzle: Dense intensity
      case 61: // Rain: Slight
      case 63: // Rain: Moderate
      case 65: return 'fa-cloud-showers-heavy'; // Rain: Heavy intensity
      case 66: // Freezing Rain: Light
      case 67: return 'fa-cloud-showers-heavy'; // Freezing Rain: Heavy intensity
      case 71: // Snow fall: Slight
      case 73: // Snow fall: Moderate
      case 75: return 'fa-snowflake'; // Snow fall: Heavy intensity
      case 77: return 'fa-snowflake'; // Snow grains
      case 80: // Rain showers: Slight
      case 81: // Rain showers: Moderate
      case 82: return 'fa-cloud-showers-heavy'; // Rain showers: Violent
      case 85: // Snow showers: Slight
      case 86: return 'fa-snowflake'; // Snow showers: Heavy
      case 95: return 'fa-cloud-bolt'; // Thunderstorm: Slight or moderate
      case 96: // Thunderstorm with slight hail
      case 99: return 'fa-cloud-bolt'; // Thunderstorm with heavy hail
      default: return 'fa-question-circle'; // Unknown weather
    }
  };

  if (!weatherLocation) {
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

  const temperatureUnit = weather.unit === 'celsius' ? '°C' : '°F';
  const weatherIconClass = getWeatherIcon(weather.weathercode);

  return (
    <span className="weather">
      <i className={`weather-type fa-solid ${weatherIconClass}`} />
      <span className="weather-temperature-value">{weather.temp}</span>
      <span className="weather-temperature-unit">{temperatureUnit}</span>
      <span className="weather-region">{weather.location}</span>
    </span>
  );
};

export default WeatherSnap;