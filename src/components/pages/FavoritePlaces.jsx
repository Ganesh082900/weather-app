import React from 'react';
import WeatherCard from './WeatherCard';

const favoritePlaces = [
    { location: "New York" },
    { location: "Tokyo" },
    { location: "London" }
];

export default function FavoritePlaces({ theme }) {
    return (
        <div className='grid grid-cols-1 gap-6 overflow-auto max-h-[80vh] p-6'>
            {favoritePlaces.map((place, index) => (
                <WeatherCard key={index} theme={theme} city={place?.location} />
            ))}
        </div>
    );
}
