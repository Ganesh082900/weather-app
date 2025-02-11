import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'; // For navigation
import emailIcon from "../../../public/images/auth/email.png";
import phoneIcon from "../../../public/images/auth/phone.png";
import userIcon from "../../../public/images/auth/user.png";
import cityIcon from "../../../public/images/auth/city.png";
import descriptionIcon from "../../../public/images/auth/description.png";
import LoadingScreen from '../loader/index';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateREP() {
    const [formData, setFormData] = useState({
        city: '',
        personName: '',
        companyName: '',
        contactName: '',
        contactDesignation: '',
        contactNumber: '',
        contactEmail: '',
        description: '',
        leadSource: '',
        assignedToBDEAdmin: '',
        isDirectlyAssigned: 'No',
    });

    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarMessage('Please correct the errors in the form.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } else {
            setErrors({});
            setLoading(true); // Show loading screen during API call

            try {
                // Simulate API call to send form data to the backend
                const response = await fetch('/api/reps', { // Update with your API endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Success response
                    setSnackbarMessage('Successfully Created REP!');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);

                    // Clear form after success
                    setFormData({
                        city: '',
                        personName: '',
                        companyName: '',
                        contactName: '',
                        contactDesignation: '',
                        contactNumber: '',
                        contactEmail: '',
                        description: '',
                        leadSource: '',
                        assignedToBDEAdmin: '',
                        isDirectlyAssigned: 'No',
                    });

                    // Simulate delay for user experience and navigate to home after success
                    setTimeout(() => {
                        setLoading(false); // Hide loading screen
                        navigate('/home'); // Navigate to home
                    }, 2000);
                } else {
                    throw new Error('Failed to create REP.');
                }
            } catch (error) {
                // Handle API failure
                setSnackbarMessage('Failed to create REP. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                setLoading(false); // Hide loading screen on failure
            }
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.city.trim()) {
            errors.city = 'City/Town is required.';
        }

        if (!data.personName.trim()) {
            errors.personName = 'Person Name is required.';
        }

        if (!data.contactName.trim()) {
            errors.contactName = 'Contact Person Name is required.';
        }

        if (!data.contactDesignation.trim()) {
            errors.contactDesignation = 'Contact Person Designation is required.';
        }

        if (!data.contactNumber.trim()) {
            errors.contactNumber = 'Contact Person Number is required.';
        } else if (!/^\d{10}$/.test(data.contactNumber)) {
            errors.contactNumber = 'Contact Number must be 10 digits.';
        }

        if (data.contactEmail && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.contactEmail)) {
            errors.contactEmail = 'Please enter a valid email address.';
        }

        if (!data.leadSource) {
            errors.leadSource = 'Lead Source is required.';
        }

        if (!data.assignedToBDEAdmin) {
            errors.assignedToBDEAdmin = 'Please assign a BDE Admin.';
        }

        return errors;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div className='px-4 bg-gray-100 h-full overflow-auto'>
            {loading && <LoadingScreen />} {/* Show loading screen while API call is in progress */}
            <h1 className="text-2xl mb-3 font-semibold text-gray-800">Create REP</h1>
            <form className='w-full max-w-4xl' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {/* City/Town */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={cityIcon} alt="city" className="h-6 w-6" />
                        </div>
                        <input
                            type="text"
                            name="city"
                            placeholder="City/Town"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        />
                    </div>

                    {/* Person Name */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={userIcon} alt="person name" className="h-6 w-6" />
                        </div>
                        <input
                            type="text"
                            name="personName"
                            placeholder="Person Name"
                            value={formData.personName}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.personName ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        />
                    </div>

                    {/* Company Name (Optional) */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={emailIcon} alt="company name" className="h-6 w-6" />
                        </div>
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name (Optional)"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Contact Person Name */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={userIcon} alt="contact name" className="h-6 w-6" />
                        </div>
                        <input
                            type="text"
                            name="contactName"
                            placeholder="Contact Person Name"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        />
                    </div>

                    {/* Contact Person Designation */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={userIcon} alt="designation" className="h-6 w-6" />
                        </div>
                        <input
                            type="text"
                            name="contactDesignation"
                            placeholder="Contact Person Designation"
                            value={formData.contactDesignation}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.contactDesignation ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        />
                    </div>

                    {/* Contact Person Number */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={phoneIcon} alt="mobile" className="h-6 w-6" />
                        </div>
                        <input
                            type="tel"
                            name="contactNumber"
                            placeholder="Contact Person Number"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        />
                    </div>

                    {/* Contact Person Email (Optional) */}
                    <div className="mb-4 flex">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={emailIcon} alt="email" className="h-6 w-6" />
                        </div>
                        <input
                            type="email"
                            name="contactEmail"
                            placeholder="Contact Person Email (Optional)"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            className={`w-full p-3 border-t border-r border-b outline-none ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Description (Optional) */}
                    <div className="mb-4 flex md:col-span-2">
                        <div className='bg-blue-500 p-3 rounded-l-lg flex items-center justify-center'>
                            <img src={descriptionIcon} alt="description" className="h-6 w-6" />
                        </div>
                        <textarea
                            name="description"
                            placeholder="Description (Optional)"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={1}
                            className={`w-full p-3 border-t border-r border-b outline-none resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Select Source of Lead */}
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 mb-2">Select Source of Lead</label>
                        <select
                            name="leadSource"
                            value={formData.leadSource}
                            onChange={handleInputChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Referral">Referral</option>
                            <option value="Advertisement">Advertisement</option>
                            <option value="Event">Event</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Assign to BDE Admin */}
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 mb-2">Assign to BDE Admin</label>
                        <select
                            name="assignedToBDEAdmin"
                            value={formData.assignedToBDEAdmin}
                            onChange={handleInputChange}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
                            required
                        >
                            <option value="">Select</option>
                            <option value="Admin1">Admin1</option>
                            <option value="Admin2">Admin2</option>
                            <option value="Admin3">Admin3</option>
                        </select>
                    </div>

                    {/* Are you directly assigned to the BDE? */}
                    <div className="mb-4 md:col-span-2">
                        <label className="block text-gray-700 mb-2">Are you directly assigned to the BDE?</label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="isDirectlyAssigned"
                                    value="Yes"
                                    checked={formData.isDirectlyAssigned === 'Yes'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="isDirectlyAssigned"
                                    value="No"
                                    checked={formData.isDirectlyAssigned === 'No'}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                No
                            </label>
                        </div>
                    </div>

                </div>

                {/* Submit button */}
                <div className="mb-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white p-3 rounded-lg transition-colors duration-200"
                    >
                        Submit
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
        </div>
    );
}
