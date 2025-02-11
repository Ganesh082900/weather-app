import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // Error or success
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.email = formData.email
            ? /\S+@\S+\.\S+/.test(formData.email)
                ? ''
                : 'Email is not valid.'
            : 'Email is required.';
        tempErrors.password = formData.password ? '' : 'Password is required.';

        setErrors(tempErrors);

        return Object.values(tempErrors).every((x) => x === '');
    };

    const handleSubmit = async (e) => {

        // Add the JWT token to verify the user - 30days

        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('https://api.example.com/admin-login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (response.ok && data.email === formData.email) {
                    // Successful login, navigate to /home
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Login Successful!');
                    setSnackbarOpen(true);
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000); // Delay to allow snackbar to show
                } else {
                    // Invalid credentials
                    setSnackbarMessage('Invalid credentials');
                    setSnackbarOpen(true);
                    setFormData({
                        email: '',
                        password: '',
                    });
                }
            } catch (error) {
                // Handle any fetch errors (e.g., network issues)
                setSnackbarMessage('Error during login');
                setSnackbarOpen(true);
                setFormData({
                    email: '',
                    password: '',
                });
            }

            // Add locoal host JOSN Server

            const response = await fetch("")
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <section className="flex flex-col items-center justify-center px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                {/* Email input */}
                <div className="mb-4 flex">
                    <div className="bg-blue-500 p-3 rounded-l-lg flex items-center justify-center">
                        <img src="./images/auth/email.png" alt="email" className="h-6 w-6" />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-3 border-t border-r border-b outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        required
                    />
                </div>
                {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

                {/* Password Input */}
                <div className="mb-4 flex">
                    <div className="bg-blue-500 p-3 rounded-l-lg flex items-center justify-center">
                        <img src="./images/auth/password.png" alt="password" className="h-6 w-6" />
                    </div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full p-3 border-t border-r border-b outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500 box-border`}
                        required
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

                {/* Submit button */}
                <div className="mb-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white p-3 rounded-lg transition-colors duration-200"
                    >
                        Login
                    </button>
                </div>
            </form>


            <div className="mt-4">
                <Link to="/forgot-password" className="text-blue-500 underline">
                    Forgot password?
                </Link>
            </div>

            {/* Snackbar for error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </section>
    );
}
