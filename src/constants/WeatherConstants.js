export const WEATHER_CONSTANTS = {
  API: {
    BASE_URL: 'https://api.weatherapi.com/v1',
    ENDPOINTS: {
      CURRENT: '/current.json',
      FORECAST: '/forecast.json',
      SEARCH: '/search.json'
    }
  },
  
  REFRESH_INTERVAL: 10 * 60 * 1000, // 10 minutes
  
  DEFAULT_LOCATIONS: [
    { name: 'Colombo', country: 'Sri Lanka', region: 'Western Province' },
    { name: 'Kandy', country: 'Sri Lanka', region: 'Central Province' },
    { name: 'Galle', country: 'Sri Lanka', region: 'Southern Province' }
  ],
  
  UV_LEVELS: {
    LOW: { max: 2, color: '#00e400', advice: 'No protection needed' },
    MODERATE: { max: 5, color: '#ffff00', advice: 'Some protection required' },
    HIGH: { max: 7, color: '#ff7e00', advice: 'Protection essential' },
    VERY_HIGH: { max: 10, color: '#ff0000', advice: 'Extra protection needed' },
    EXTREME: { max: Infinity, color: '#8b00ff', advice: 'Avoid sun exposure' }
  }
};