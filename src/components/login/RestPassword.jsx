import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [email] = useState('superadmin@example.com'); // Simulated stored email
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
        const { password, confirmPassword } = formData;

        // Validate password length
        if (!password) {
            tempErrors.password = 'Password is required.';
        } else if (password.length < 6 || password.length > 15) {
            tempErrors.password = 'Password must be between 6 and 15 characters.';
        }

        // Validate confirm password
        if (!confirmPassword) {
            tempErrors.confirmPassword = 'Confirm Password is required.';
        } else if (password !== confirmPassword) {
            tempErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(tempErrors);

        return Object.values(tempErrors).every((x) => x === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                // Simulate PUT API call to update the password based on the stored email
                const response = await fetch(`https://api.example.com/update-password/${email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password: formData.password,
                    }),
                });

                if (response.ok) {
                    // Success: Show success message via Snackbar
                    setSnackbarMessage('Password successfully reset!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);

                    // Clear form fields
                    setFormData({
                        password: '',
                        confirmPassword: '',
                    });

                    // After a delay, redirect to login page
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    // Failure: Show error message via Snackbar
                    throw new Error('Failed to reset password.');
                }
            } catch (error) {
                setSnackbarMessage('Failed to reset password. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);

                // Clear form fields
                setFormData({
                    password: '',
                    confirmPassword: '',
                });
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <section className="flex flex-col items-center justify-center px-4">
            <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                {/* New Password Input */}
                <div className="mb-4 flex">
                    <div className="bg-blue-500 p-3 rounded-l-lg flex items-center justify-center">
                        <img src="./images/auth/password.png" alt="password" className="h-6 w-6" />
                    </div>
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full p-3 border-t border-r border-b outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        required
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

                {/* Confirm Password Input */}
                <div className="mb-4 flex">
                    <div className="bg-blue-500 p-3 rounded-l-lg flex items-center justify-center">
                        <img src="./images/auth/password.png" alt="confirm password" className="h-6 w-6" />
                    </div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full p-3 border-t border-r border-b outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        required
                    />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}

                {/* Submit button */}
                <div className="mb-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white p-3 rounded-lg transition-colors duration-200"
                    >
                        Reset Password
                    </button>
                </div>
            </form>

            {/* Snackbar for feedback */}
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
