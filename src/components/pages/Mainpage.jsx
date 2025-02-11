import React, { useState } from 'react';
import WeatherCard from '../../components/pages/WeatherCard'; // Ensure correct path

export default function Mainpage({ theme }) {
  const [searchCity, setSearchCity] = useState(""); // State to capture input
  const [city, setCity] = useState("Hyderabad"); // Default city for weather data

  // Function to update city when user searches
  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      setCity(searchCity.trim());
      setSearchCity(""); // Clear input field after search
    }
  };

  return (
    <div className={`w-full h-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} flex flex-col p-6`}>
      {/* Search Bar */}
      <div className='w-[30vw] flex items-center border-2 border-gray-300 p-2 rounded-md mb-6'>
        <img src="/images/search.png" alt="search" className='w-6 h-6 mr-2' />
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Search for a city"
          className={`w-full bg-transparent outline-none px-2 ${theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-600'}`}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Search
        </button>
      </div>

      {/* Weather Card updates dynamically based on searched city */}
      <WeatherCard theme={theme} city={city} />
    </div>
  );
}
