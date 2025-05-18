import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '86afb2e9077b75a047c5edf70184dfd0'; 

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError('City not found.');
      }
    } catch (err) {
      setError('Something went wrong.');
      setWeather(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };
console.log('weather data:', weather);
console.log('error:', error);

return (
  <div className={`app ${weather ? weather.weather[0].main.toLowerCase() : ''}`}>
    <h1>Weather App</h1>
    <input
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyDown={handleKeyDown}
    />
    <button onClick={fetchWeather}>Search</button>

    {error && <p className="error">{error}</p>}

    {weather && (
      <div className="weather-box">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p>{weather.weather[0].main}</p>
        <p>{Math.round(weather.main.temp)}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )}
  </div>
);

}

export default App;
