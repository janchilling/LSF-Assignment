import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ condition, size = 'medium' }) => {
  const sizeClass = `weather-icon-${size}`;
  
  return (
    <div className={`weather-icon ${sizeClass}`}>
      <img 
        src={`https:${condition.icon}`}
        alt={condition.text}
        className="weather-icon-image"
      />
    </div>
  );
};

export default WeatherIcon;