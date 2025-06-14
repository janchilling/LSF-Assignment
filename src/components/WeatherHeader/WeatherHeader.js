import React from 'react';
import './WeatherHeader.css';

const WeatherHeader = ({ location, onRefresh, loading }) => {
  return (
    <div className="weather-header">
      <h1 className="weather-title">Weather Reporter</h1>
      <div className="location-info">
        <span className="location-icon">📍</span>
        <span className="location-text">
          {location.name}, {location.country}
        </span>
      </div>
      <button 
        className={`refresh-btn ${loading ? 'loading' : ''}`}
        onClick={onRefresh}
        disabled={loading}
      >
        {loading ? '🔄' : '↻'} Refresh
      </button>
    </div>
  );
};

export default WeatherHeader;