import React, { useState } from 'react';

const statesAndDistricts = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    // Add more states and their corresponding districts here
};

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        state: '',
        district: '',
        city: '',
        role: '',
    });

    const [districts, setDistricts] = useState([]);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mobile') {
            // Only allow numeric input
            if (/^\d*$/.test(value)) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setFormData({
            ...formData,
            state: selectedState,
            district: '', // Reset district when state changes
        });
        setDistricts(statesAndDistricts[selectedState] || []);
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = formData.name ? "" : "Name is required.";
        tempErrors.email = formData.email ? (/\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid.") : "Email is required.";
        tempErrors.mobile = formData.mobile ? (formData.mobile.length === 10 ? "" : "Mobile number must be 10 digits.") : "Mobile number is required.";
        tempErrors.password = formData.password ? "" : "Password is required.";
        tempErrors.state = formData.state ? "" : "State is required.";
        tempErrors.district = formData.district ? "" : "District is required.";
        tempErrors.city = formData.city ? "" : "City is required.";
        tempErrors.role = formData.role ? "" : "Role is required.";

        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log(formData);
            setFormData({
                name: '',
                email: '',
                mobile: '',
                password: '',
                state: '',
                district: '',
                city: '',
                role: '',
            });
            setDistricts([]);
            alert("User Created Successfully!");
        }
    };

    return (
        <div className="h-[84vh] flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Mobile Number Field */}
                    <div className="mb-4">
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className={`w-full p-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            required
                            maxLength={10}
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    {/* Select State and District */}
                    <div className="flex justify-between mb-4">
                        <div className="relative w-1/2 mr-2">
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleStateChange}
                                className={`w-full p-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                required
                            >
                                <option value="">Select State</option>
                                {Object.keys(statesAndDistricts).map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <i className="fas fa-chevron-down text-gray-500"></i>
                            </span>
                            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                        </div>

                        <div className="relative w-1/2 ml-2">
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                className={`w-full p-3 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                                required
                            >
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <i className="fas fa-chevron-down text-gray-500"></i>
                            </span>
                            {errors.district && <p className="text-red-500 text-sm">{errors.district}</p>}
                        </div>
                    </div>

                    {/* City Field */}
                    <div className="mb-4">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            required
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    {/* Select Role */}
                    <div className="mb-6">
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className={`w-full p-3 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            {/* Add more roles as needed */}
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;
