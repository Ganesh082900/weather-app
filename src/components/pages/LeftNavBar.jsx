import React from 'react';
import { useLocation } from 'react-router-dom';

export default function LeftNavBar({ theme }) {
    const isDarkMode = theme === 'dark';
    const location = useLocation();

    const getLinkClasses = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center h-[8vh] px-4 py-2 rounded-md ${isActive
            ? isDarkMode
                ? 'bg-blue-500 text-white'
                : 'bg-blue-300 text-gray-900'
            : isDarkMode
                ? 'hover:bg-gray-700 text-white'
                : 'hover:bg-blue-200 text-gray-800'
            } transition-all duration-300`;
    };

    return (
        <div className={`w-[15vw] min-h-[92vh] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} flex flex-col gap-4 border-r-2 border-gray-300 shadow-md p-4`}>
            {/* <a href="/select-place" className={getLinkClasses('/select-place')}>
                Select Place
            </a> */}
            <a href="/favorite-places" className={getLinkClasses('/favorite-places')}>
                Favorites
            </a>
        </div>
    );
}
