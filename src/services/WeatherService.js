const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.weatherapi.com/v1';

class WeatherService {
  async getCurrentWeather(location) {

    console.log(API_KEY)
    const response = await fetch(
      `${API_BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data;
  }

  async searchLocations(query) {

    const response = await fetch(
      `${API_BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );

    if (!response.ok) {
      throw new Error(`Search API Error: ${response.status}`);
    }

    return response.json();
  }

  getDemoData() {
    return {
      location: {
        name: 'Colombo',
        country: 'Sri Lanka',
        region: 'Western Province',
        localtime: new Date().toISOString().slice(0, 16).replace('T', ' ')
      },
      current: {
        temp_c: 28,
        temp_f: 82,
        condition: {
          text: 'Partly cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          code: 1003
        },
        wind_mph: 7.4,
        wind_kph: 11.9,
        wind_dir: 'SW',
        pressure_mb: 1013.0,
        pressure_in: 29.91,
        precip_mm: 0.0,
        precip_in: 0.0,
        humidity: 75,
        cloud: 50,
        feelslike_c: 32,
        feelslike_f: 90,
        vis_km: 10.0,
        vis_miles: 6.0,
        uv: 6.0,
        gust_mph: 10.5,
        gust_kph: 16.9,
        air_quality: {
          co: 233.9,
          no2: 5.5,
          o3: 154.3,
          so2: 7.9,
          pm2_5: 8.6,
          pm10: 9.8,
          'us-epa-index': 1,
          'gb-defra-index': 1
        }
      }
    };
  }

  getDemoLocations(query) {
    const locations = [
      { name: 'Colombo', country: 'Sri Lanka', region: 'Western Province' },
      { name: 'Kandy', country: 'Sri Lanka', region: 'Central Province' },
      { name: 'Galle', country: 'Sri Lanka', region: 'Southern Province' },
      { name: 'Jaffna', country: 'Sri Lanka', region: 'Northern Province' }
    ];

    return locations.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export const weatherService = new WeatherService();
