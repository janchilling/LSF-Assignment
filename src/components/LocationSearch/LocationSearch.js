import React, { useState, useEffect, useRef } from 'react';
import { useWeather } from '../../context/WeatherContext';
import { weatherService } from '../../services/WeatherService';
import './LocationSearch.css';

const LocationSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setLocation } = useWeather();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await weatherService.searchLocations(query);
        setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
      } catch (error) {
        console.error('Error searching locations:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchLocations, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="location-search" ref={searchRef}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="search-input"
        />
        <div className="search-icon">🔍</div>
      </div>
      
      {showSuggestions && (
        <div className="suggestions-container">
          {loading && (
            <div className="suggestion-item loading">
              <div className="suggestion-spinner"></div>
              Searching...
            </div>
          )}
          
          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <div className="suggestion-item no-results">
              No locations found
            </div>
          )}
          
          {!loading && suggestions.map((location, index) => (
            <div
              key={`${location.name}-${location.country}-${index}`}
              className="suggestion-item"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="suggestion-name">{location.name}</div>
              <div className="suggestion-details">
                {location.region}, {location.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;