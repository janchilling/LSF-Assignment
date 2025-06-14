import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { weatherService } from '../services/WeatherService';

const WeatherContext = createContext();

const initialState = {
  weatherData: null,
  loading: false,
  error: null,
  lastUpdated: null,
  selectedLocation: { name: 'Colombo', country: 'Sri Lanka' }
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
        lastUpdated: new Date(),
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        weatherData: null
      };
    case 'SET_LOCATION':
      return {
        ...state,
        selectedLocation: action.payload
      };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchWeather = useCallback(async (location) => {
    dispatch({ type: 'FETCH_START' });
    
    try {
      const data = await weatherService.getCurrentWeather(location);
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const setLocation = useCallback((location) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  }, []);

  const value = {
    ...state,
    fetchWeather,
    setLocation
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};