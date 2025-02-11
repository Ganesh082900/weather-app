import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OtpVerification() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const inputRefs = useRef([]);

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (/^\d$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input if a digit was entered
            if (value !== '' && index < 3) {
                inputRefs.current[index + 1].focus();
            }

            if (error) {
                setError('');
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            setError('Please enter a valid 4-digit OTP');
            return;
        }

        try {
            // Replace with your actual API call
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otp: otpValue }),
            });

            if (response.ok) {
                // Handle successful verification
                alert('OTP verified successfully');
                // Navigate to the next page or perform any action
                // navigate('/next-page');
            } else {
                // Handle errors returned by the API
                const errorData = await response.json();
                setError(errorData.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <section className="flex flex-col items-center justify-center lg:min-h-screen px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Enter OTP</h2>
            <form className='w-full max-w-md' onSubmit={handleSubmit}>
                <div className="flex justify-around mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            name={`otp-${index}`}
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength="1"
                            className={`w-12 h-12 text-center text-lg border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                            required
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className='mb-6 flex justify-center'>
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white py-3 rounded-lg transition-colors duration-300"
                    >
                        Verify
                    </button>
                </div>
            </form>
            <div className="mt-4 text-center">
                <button
                    type="button"
                    className="text-blue-500 underline"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
        </section>
    );
}
