import React, { useEffect } from 'react';
import { useWeather } from '../../context/WeatherContext';
import WeatherHeader from '../WeatherHeader/WeatherHeader';
import WeatherMain from '../WeatherMain/WeatherMain';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import LocationSearch from '../LocationSearch/LocationSearch';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const { weatherData, loading, error, selectedLocation, fetchWeather } = useWeather();

  useEffect(() => {
    const locationString = `${selectedLocation.name},${selectedLocation.country}`;
    fetchWeather(locationString);
  }, [selectedLocation, fetchWeather]);

  useEffect(() => {
    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      const locationString = `${selectedLocation.name},${selectedLocation.country}`;
      fetchWeather(locationString);
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedLocation, fetchWeather]);

  const handleRefresh = () => {
    const locationString = `${selectedLocation.name},${selectedLocation.country}`;
    fetchWeather(locationString);
  };

  if (loading && !weatherData) {
    return (
      <div className="weather-dashboard">
        <LoadingSpinner message="Fetching weather data..." />
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="weather-dashboard">
        <ErrorMessage 
          message={error} 
          onRetry={handleRefresh}
        />
      </div>
    );
  }

  return (
    <div className="weather-dashboard">
      <WeatherHeader 
        location={weatherData?.location || selectedLocation}
        onRefresh={handleRefresh}
        loading={loading}
      />
      
      <LocationSearch />
      
      {weatherData && (
        <>
          <WeatherMain 
            current={weatherData.current}
            location={weatherData.location}
          />
          <WeatherDetails 
            current={weatherData.current}
          />
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;