import { useState, useEffect, useCallback } from 'react';
import { weatherService } from '../services/WeatherService';

export const useWeatherData = (location, autoRefresh = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await weatherService.getCurrentWeather(location);
      setData(weatherData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location, fetchWeather]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (location && !loading) {
        fetchWeather();
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [location, loading, autoRefresh, fetchWeather]);

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchWeather
  };
};

// ==============================================
// src/utils/weatherUtils.js
export const formatTemperature = (temp, unit = 'C') => {
  return `${Math.round(temp)}°${unit}`;
};

export const formatWindSpeed = (speed, unit = 'kph') => {
  return `${speed} ${unit}`;
};

export const formatPressure = (pressure, unit = 'mb') => {
  return `${pressure} ${unit}`;
};

export const getUVIndexLevel = (uv) => {
  if (uv <= 2) return { level: 'Low', color: '#00e400' };
  if (uv <= 5) return { level: 'Moderate', color: '#ffff00' };
  if (uv <= 7) return { level: 'High', color: '#ff7e00' };
  if (uv <= 10) return { level: 'Very High', color: '#ff0000' };
  return { level: 'Extreme', color: '#8b00ff' };
};

export const getAirQualityInfo = (index) => {
  const levels = [
    { level: 'Good', color: '#00e400', description: 'Air quality is considered satisfactory' },
    { level: 'Moderate', color: '#ffff00', description: 'Air quality is acceptable' },
    { level: 'Unhealthy for Sensitive Groups', color: '#ff7e00', description: 'Sensitive groups may experience minor issues' },
    { level: 'Unhealthy', color: '#ff0000', description: 'Everyone may experience health effects' },
    { level: 'Very Unhealthy', color: '#8f3f97', description: 'Health warnings of emergency conditions' },
    { level: 'Hazardous', color: '#7e0023', description: 'Health alert: everyone may experience serious effects' }
  ];
  
  return levels[index - 1] || { level: 'Unknown', color: '#636e72', description: 'Air quality data unavailable' };
};

export const formatDateTime = (dateString, options = {}) => {
  const date = new Date(dateString);
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  return date.toLocaleString([], defaultOptions);
};

export const getWeatherAdvice = (condition, temp, uv, humidity) => {
  const advice = [];
  
  if (temp > 30) {
    advice.push('🌡️ Hot weather - stay hydrated and seek shade');
  } else if (temp < 15) {
    advice.push('🧥 Cool weather - consider wearing a jacket');
  }
  
  if (uv > 7) {
    advice.push('☀️ High UV - wear sunscreen and protective clothing');
  }
  
  if (humidity > 80) {
    advice.push('💧 High humidity - may feel warmer than actual temperature');
  }
  
  if (condition.text.toLowerCase().includes('rain')) {
    advice.push('☔ Rain expected - bring an umbrella');
  }
  
  return advice;
};