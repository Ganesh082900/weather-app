import React, { useState } from 'react';
import { useEffect } from 'react';
import { Alert } from 'react';
// import Franchise from '../ViewFranchise';
// import School from '../ViewSchool';
// import FranchiseAgent from '../ViewFranchiseAgent';
// import SchoolAgent from '../ViewSchoolAgent';
// import EndUser from '../ViewEnduser';

const SuperAdminHome = () => {
    const [selectedComponent, setSelectedComponent] = useState('Franchise');

    const headers = [
        { key: 'Franchise', label: 'Franchise' },
        { key: 'School', label: 'School' },
        { key: 'FranchiseAgent', label: 'Franchise Agent' },
        { key: 'SchoolAgent', label: 'School Agent' },
        { key: 'EndUser', label: 'End User' },
    ];

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'Franchise':
                return <Franchise />;
            case 'School':
                return <School />;
            case 'FranchiseAgent':
                return <FranchiseAgent />;
            case 'SchoolAgent':
                return <SchoolAgent />;
            case 'EndUser':
                return <EndUser />;
            default:
                return <Franchise />;
        }
    };

    useEffect(() => {
        const handleBackButton = () => {
            const confirmExit = window.confirm('Are you sure you want to exit?');
            if (confirmExit) {
                window.close(); // or other logic to handle app exit
            }
        };

        window.addEventListener('beforeunload', handleBackButton);

        return () => {
            window.removeEventListener('beforeunload', handleBackButton);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="border border-blue-500 rounded-md mb-4">
                <div className="bg-blue-500 text-white font-bold p-2 text-sm">
                    Select Type
                </div>
                <select
                    className="w-full p-2 bg-white border rounded-md"
                    value={selectedComponent}
                    // onChange={(e) => setSelectedComponent(e.target.value)}
                >
                    {headers.map((item) => (
                        <option key={item.key} value={item.key}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* <div className="flex flex-col items-center">
                {renderComponent()}
            </div> */}
        </div>
    );
};

export default SuperAdminHome;
