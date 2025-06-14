import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard';
import './App.css';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <WeatherDashboard />
      </div>
    </WeatherProvider>
  );
}

export default App;