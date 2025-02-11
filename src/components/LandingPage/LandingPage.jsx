import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            {/* Left Side (Image) */}
            <div className="flex justify-center items-end w-full lg:items-center lg:h-full lg:w-1/2">
                <img
                    src="./images/logo_bg_white.png"
                    alt="Logo"
                    className="object-contain"
                />
            </div>

            {/* Right Side (Forms) */}
            <div className="flex flex-col justify-center w-full lg:w-1/2 h-1/2 lg:h-full">
                <Outlet />
            </div>
        </div>
    );
}
