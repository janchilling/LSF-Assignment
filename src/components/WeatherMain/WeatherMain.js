import React from 'react';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './WeatherMain.css';

const WeatherMain = ({ current, location }) => {
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-main">
      <div className="temperature-section">
        <div className="temperature">
          {Math.round(current.temp_c)}°C
        </div>
        <div className="temperature-sub">
          Feels like {Math.round(current.feelslike_c)}°C
        </div>
      </div>
      
      <WeatherIcon 
        condition={current.condition}
        size="large"
      />
      
      <div className="condition-section">
        <div className="condition">
          {current.condition.text}
        </div>
        <div className="local-time">
          Local time: {formatTime(location.localtime)}
        </div>
      </div>
    </div>
  );
};

export default WeatherMain;