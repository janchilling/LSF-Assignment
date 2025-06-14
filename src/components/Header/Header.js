import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo-section">
            <span className="logo-icon">🌤️</span>
            <div className="logo-text">
              <h1 className="logo-title">WeatherNow</h1>
              <span className="logo-subtitle">Real-time Weather Updates</span>
            </div>
          </div>
        </div>
        
        <div className="header-center">
          <nav className="nav-menu">
            <a href="#weather" className="nav-link active">Weather</a>
            <a href="#forecast" className="nav-link">Forecast</a>
            <a href="#maps" className="nav-link">Maps</a>
          </nav>
        </div>
        
        <div className="header-right">
          <div className="datetime-section">
            <div className="current-time">{formatTime(currentTime)}</div>
            <div className="current-date">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;