import React from 'react';
import { WeatherProvider } from './context/WeatherContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard';
import './App.css';

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          <WeatherDashboard />
        </main>
        <Footer />
      </div>
    </WeatherProvider>
  );
}

export default App;