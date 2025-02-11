import React from 'react'
import { Link } from 'react-router-dom'

export default function TopNav() {
    return (
        <section className='h-[10vh] w-full px-2 lg:p-2 flex justify-between'>
            <div className='w-[12vw] h-full flex items-center'>
                <img className='object-contain w-full h-full' src="https://androidrobo.com/wp-content/uploads/2024/02/Android-Robo_Logo-768x354.png" alt="logo" />
            </div>
            <Link to={"/login"} className='w-[4vw] h-full flex justify-center items-center cursor-pointer'>
                <img className='object-contain lg:w-[2vw]' src="../../../public/images/tab/logout.png" alt="logout" />
            </Link>
        </section>
    )
}
