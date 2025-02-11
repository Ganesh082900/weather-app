import React, { useState, useEffect } from 'react';

export default function TopNavBar() {
    const [currentTime, setCurrentTime] = useState('');
    const [theme, setTheme] = useState('light'); // Default: Light theme
    const [temperatureUnit, setTemperatureUnit] = useState('C'); // Default: Celsius

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
            const formattedTime = now.toLocaleString('en-US', options);
            setCurrentTime(formattedTime);
        };

        updateTime(); // Set initial time
        const intervalId = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, []);

    // Dynamically adjust styles based on theme
    const isDarkMode = theme === 'dark';

    return (
        <div className={`w-full h-[8vh] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} flex items-center justify-between border-b-2 px-4 shadow-sm`}>
            {/* Left Section: Logo */}
            <a className='flex items-center' href="/">
                <img
                    src="../../../public/images/logo.jpeg"
                    alt="Weather App Logo"
                    className='w-8 h-8 mr-2 rounded-sm'
                />
                <span className='text-lg font-semibold'>Weather App</span>
            </a>

            {/* Center Section: Date and Time */}
            <div className='font-medium'>
                {currentTime}
            </div>

            {/* Right Section: Temperature and Theme Toggles */}
            <div className='flex items-center gap-[3vw]'>
                {/* Temperature Toggle */}
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => setTemperatureUnit('C')}
                        className={`px-3 py-1 rounded-md border-2 ${temperatureUnit === 'C' ? 'bg-blue-500 text-white' : 'border-gray-400 hover:bg-blue-200 transition-all duration-300'}`}
                    >
                        °C
                    </button>
                    <button
                        onClick={() => setTemperatureUnit('F')}
                        className={`px-3 py-1 rounded-md border-2 ${temperatureUnit === 'F' ? 'bg-blue-500 text-white' : 'border-gray-400 hover:bg-blue-200 transition-all duration-300'}`}
                    >
                        °F
                    </button>
                </div>

                {/* Theme Toggle */}
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`px-3 py-1 rounded-md border-2 ${isDarkMode ? 'bg-blue-500 text-white' : 'border-gray-400 hover:bg-blue-200 transition-all duration-300'}`}
                    >
                        Dark
                    </button>
                    <button
                        onClick={() => setTheme('light')}
                        className={`px-3 py-1 rounded-md border-2 ${!isDarkMode ? 'bg-blue-500 text-white' : 'border-gray-400 hover:bg-blue-200 transition-all duration-300'}`}
                    >
                        Light
                    </button>
                </div>
            </div>
        </div>
    );
}
