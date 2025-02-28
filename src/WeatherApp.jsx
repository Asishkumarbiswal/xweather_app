import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiKey = '7a1ba24836004c0c93f111401252802';

    const handleSearch = async () => {
        setLoading(true);
        setWeatherData(null);
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            alert('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-app">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading data...</p>}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <h2>Temperature</h2>
                        <p>{weatherData.current.temp_c} °C</p>
                    </div>
                    <div className="weather-card">
                        <h2>Humidity</h2>
                        <p>{weatherData.current.humidity} %</p>
                    </div>
                    <div className="weather-card">
                        <h2>Condition</h2>
                        <p>{weatherData.current.condition.text}</p>
                    </div>
                    <div className="weather-card">
                        <h2>Wind Speed</h2>
                        <p>{weatherData.current.wind_kph} kph</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;