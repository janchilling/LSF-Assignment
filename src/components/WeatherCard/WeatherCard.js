import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ icon, label, value, subValue }) => {
  return (
    <div className="weather-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <div className="card-label">{label}</div>
        <div className="card-value">{value}</div>
        {subValue && <div className="card-subvalue">{subValue}</div>}
      </div>
    </div>
  );
};

export default WeatherCard;