import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../navBar/TopNavBar';
import LeftNavBar from '../pages/LeftNavBar';

export default function LandingPage({ theme, setTheme }) {
    return (
        <div className={`w-[100vw] h-[100vh] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            <TopNavBar theme={theme} setTheme={setTheme} />
            <div className="flex">
                <LeftNavBar theme={theme} />
                <div className="w-[85vw] p-6">
                    <Outlet /> {/* This will render either MainPage or FavoritePlaces based on the route */}
                </div>
            </div>
        </div>
    );
}
