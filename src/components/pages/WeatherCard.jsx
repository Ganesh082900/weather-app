import React, { useEffect, useState } from 'react';
import search_icon from '../../../public/images/search.png';
import clear_icon from '../../../public/images/clear.png';
import cloud_icon from '../../../public/images/cloud.png';
import rain_icon from '../../../public/images/rain.png';
import drizzle_icon from '../../../public/images/drizzle.png';
import snow_icon from '../../../public/images/snow.png';
import wind_icon from '../../../public/images/wind.png';
import humidity_icon from '../../../public/images/humidity.png';

const WeatherCard = ({ theme, city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [forecastDays, setForecastDays] = useState(5);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    };

    const fetchWeather = async (cityName) => {
        if (!cityName) return;

        try {
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(currentWeatherUrl),
                fetch(forecastUrl)
            ]);

            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();

            if (!currentResponse.ok || !forecastResponse.ok) {
                alert(currentData.message || "Failed to fetch forecast data.");
                return;
            }

            setWeatherData({
                humidity: currentData.main.humidity,
                windSpeed: currentData.wind.speed,
                temperature: Math.floor(currentData.main.temp),
                location: currentData.name,
                icon: allIcons[currentData.weather[0].icon] || clear_icon
            });

            setForecastData(forecastData.list.filter((_, index) => index % 8 === 0).slice(0, forecastDays));

        } catch (error) {
            setWeatherData(null);
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeather(city);
    }, [city, forecastDays]);

    return (
        <div className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            {weatherData ? (
                <section className="flex flex-col md:flex-row gap-6">
                    {/* Left Section - Current Weather */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <img src={weatherData.icon} alt="Weather Icon" className="w-24 h-24" />
                        <p className="text-5xl font-bold">{weatherData.temperature}°C</p>
                        <p className="text-xl">{weatherData.location}</p>
                        <div className="flex justify-around w-full mt-4 border-t border-gray-300 pt-4">
                            <div className="flex items-center gap-2">
                                <img src={humidity_icon} alt="Humidity" className="w-6 h-6" />
                                <div>
                                    <p className="font-semibold">{weatherData.humidity}%</p>
                                    <span className="text-sm">Humidity</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={wind_icon} alt="Wind Speed" className="w-6 h-6" />
                                <div>
                                    <p className="font-semibold">{weatherData.windSpeed} km/h</p>
                                    <span className="text-sm">Wind Speed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Forecast Toggle & Data */}
                    <div className="md:w-2/3">
                        {/* Forecast Toggle Buttons */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={() => setForecastDays(5)}
                                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${forecastDays === 5 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black hover:bg-blue-400'
                                    }`}
                            >
                                5-Day Forecast
                            </button>
                            <button
                                onClick={() => setForecastDays(7)}
                                className={`px-4 py-2 rounded-md font-semibold transition-all duration-300 ${forecastDays === 7 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black hover:bg-blue-400'
                                    }`}
                            >
                                7-Day Forecast
                            </button>
                        </div>

                        {/* Forecast Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {forecastData.map((day, index) => (
                                <div key={index} className={`p-4 rounded-md shadow-md text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <p className="font-medium">{new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                    <img src={allIcons[day.weather[0].icon] || clear_icon} alt="Weather Icon" className="w-12 h-12 mx-auto" />
                                    <p className="text-xl font-bold">{Math.floor(day.main.temp)}°C</p>
                                    <p className="text-sm">{day.weather[0].main}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <p className="text-center">No Weather Data Available</p>
            )}
        </div>
    );
};

export default WeatherCard;
