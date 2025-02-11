import React from 'react';
import Lottie from 'lottie-react';
import roboLoading from '../../../public/animation/robo_loading.json'; // Replace with the correct path to your Lottie JSON file

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Lottie
                animationData={roboLoading}
                loop
                className="w-[14rem] h-[14rem]"
            />
        </div>
    );
};

export default Loader;
