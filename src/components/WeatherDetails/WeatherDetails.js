import React from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './WeatherDetails.css';

const WeatherDetails = ({ current }) => {
  const getUVLevel = (uv) => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const getAirQualityLevel = (index) => {
    const levels = ['Good', 'Moderate', 'Unhealthy for Sensitive', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
    return levels[index - 1] || 'Unknown';
  };

  return (
    <div className="weather-details">
      <WeatherCard
        icon="💧"
        label="Humidity"
        value={`${current.humidity}%`}
      />
      
      <WeatherCard
        icon="💨"
        label="Wind Speed"
        value={`${current.wind_kph} km/h`}
        subValue={`${current.wind_dir} • Gusts ${current.gust_kph} km/h`}
      />
      
      <WeatherCard
        icon="☀️"
        label="UV Index"
        value={current.uv}
        subValue={getUVLevel(current.uv)}
      />
      
      <WeatherCard
        icon="👁️"
        label="Visibility"
        value={`${current.vis_km} km`}
      />
      
      <WeatherCard
        icon="🌫️"
        label="Cloud Cover"
        value={`${current.cloud}%`}
      />
      
      <WeatherCard
        icon="🌡️"
        label="Pressure"
        value={`${current.pressure_mb} mb`}
      />
      
      {current.air_quality && (
        <WeatherCard
          icon="🌬️"
          label="Air Quality"
          value={getAirQualityLevel(current.air_quality['us-epa-index'])}
          subValue={`PM2.5: ${current.air_quality.pm2_5} μg/m³`}
        />
      )}
      
      {current.precip_mm > 0 && (
        <WeatherCard
          icon="🌧️"
          label="Precipitation"
          value={`${current.precip_mm} mm`}
        />
      )}
    </div>
  );
};

export default WeatherDetails;