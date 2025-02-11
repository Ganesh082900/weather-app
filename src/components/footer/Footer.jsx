import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const [selected, setSelected] = useState('home');
    const navigate = useNavigate();

    const handleSelect = (key, route) => {
        setSelected(key);
        navigate(route);
    };

    return (
        <section className='w-full h-[8vh] flex justify-around items-center *:w-[7vw] rounded'>
            <img
                className={`${selected === 'home' ? 'bg-[#e9def5]' : ''}`}
                src="./svg/house.svg"
                alt="Home"
                onClick={() => handleSelect('home', '/home')}
            />
            <img
                className={`${selected === 'people' ? 'bg-[#e9def5]' : ''}`}
                src="./svg/people-fill.svg"
                alt="People"
                onClick={() => handleSelect('people', '/people')}
            />
        </section>
    );
}
