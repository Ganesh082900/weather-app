import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ForgotPassword() {
    const [formData, setFormData] = useState({ email: '' });
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // To toggle between error or success messages
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = {};

        if (!formData.email) {
            valid = false;
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            valid = false;
            newErrors.email = 'Please enter a valid email address';
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        try {
            // Simulate API call to get the super admin email
            const response = await fetch('https://api.example.com/get-super-admin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            // Check if the input email matches the super admin email
            if (response.ok && data.email === formData.email) {
                // Email is correct, send OTP
                const otpResponse = await fetch('https://api.example.com/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: formData.email }),
                });

                if (otpResponse.ok) {
                    // Successfully sent OTP, navigate to /otp-verification
                    setSnackbarSeverity('success');
                    setSnackbarMessage('OTP sent to your email');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate('/otp-verification');
                    }, 2000);
                } else {
                    throw new Error('Failed to send OTP');
                }
            } else {
                // Email is incorrect
                setSnackbarMessage('Email not found or incorrect');
                setSnackbarOpen(true);
                setFormData({ email: '' });
            }
        } catch (error) {
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarOpen(true);
            setFormData({ email: '' });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <section className="flex flex-col items-center justify-center lg:min-h-screen px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="mb-6 flex">
                    <div className="bg-blue-500 p-3 rounded-l-lg flex items-center justify-center">
                        <img src="./images/auth/email.png" alt="email" className="h-6 w-6" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 border-t border-r border-b rounded-r-lg focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                            }`}
                        required
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

                <div className="mb-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white py-3 rounded-lg transition-colors duration-300"
                    >
                        Reset
                    </button>
                </div>
            </form>
            <div className="mt-4">
                <Link to="/login" className="text-blue-500 underline">
                    Back to login
                </Link>
            </div>

            {/* Snackbar for messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            // anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </section>
    );
}
