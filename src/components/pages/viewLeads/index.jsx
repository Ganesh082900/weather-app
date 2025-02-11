import React, { useState } from 'react';

const ViewLeads = () => {
    const [leads, setLeads] = useState([]);
    const [selectedType, setSelectedType] = useState('all');

    // Dummy data for leads with different types
    const dummyLeads = [
        {
            _id: '1',
            title: 'Lead 1',
            city: 'New York',
            district: 'Manhattan',
            type: 'Type A',
        },
        {
            _id: '2',
            title: 'Lead 2',
            city: 'Los Angeles',
            district: 'Beverly Hills',
            type: 'Type B',
        },
        {
            _id: '3',
            title: 'Lead 3',
            city: 'Chicago',
            district: 'Downtown',
            type: 'Type A',
        },
        {
            _id: '4',
            title: 'Lead 4',
            city: 'Miami',
            district: 'South Beach',
            type: 'Type C',
        },
        {
            _id: '1',
            title: 'Lead 1',
            city: 'New York',
            district: 'Manhattan',
            type: 'Type A',
        },
        {
            _id: '2',
            title: 'Lead 2',
            city: 'Los Angeles',
            district: 'Beverly Hills',
            type: 'Type B',
        },
        {
            _id: '3',
            title: 'Lead 3',
            city: 'Chicago',
            district: 'Downtown',
            type: 'Type A',
        },
        {
            _id: '4',
            title: 'Lead 4',
            city: 'Miami',
            district: 'South Beach',
            type: 'Type C',
        },
        {
            _id: '2',
            title: 'Lead 2',
            city: 'Los Angeles',
            district: 'Beverly Hills',
            type: 'Type B',
        },
        {
            _id: '3',
            title: 'Lead 3',
            city: 'Chicago',
            district: 'Downtown',
            type: 'Type A',
        },
        {
            _id: '4',
            title: 'Lead 4',
            city: 'Miami',
            district: 'South Beach',
            type: 'Type C',
        },
        // Add more dummy leads as needed
    ];

    // Simulate data fetching
    useState(() => {
        setLeads(dummyLeads);
    }, []);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    // Filter leads based on selected type
    const filteredLeads = selectedType === 'all' ? leads : leads.filter(lead => lead.type === selectedType);

    if (leads.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="mb-4">
                    <img
                        src="/path/to/empty-folder.png"
                        alt="No Leads"
                        className="w-24 h-24"
                    />
                </div>
                <p className="text-xl text-gray-700">No Leads available</p>
            </div>
        );
    }

    return (
        <div className="px-4 bg-gray-100 h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">View Leads</h1>
                <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="all">All Leads</option>
                    <option value="Type A">School Leads</option>
                    <option value="Type B">Franchise Lead</option>
                    <option value="Type C">School Agent</option>
                    <option value="Type C">Franchise Agent</option>
                    <option value="Type C">REP</option>
                    <option value="Type C">B2C</option>
                </select>
            </div>

            {filteredLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="mb-4">
                        <img
                            src="/path/to/empty-folder.png"
                            alt="No Leads"
                            className="w-24 h-24"
                        />
                    </div>
                    <p className="text-xl text-gray-700">No Leads available for the selected type</p>
                </div>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredLeads.map((lead) => (
                        <li
                            key={lead._id}
                            className="bg-white rounded-lg shadow-md border border-gray-300 p-4"
                        >
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-blue-500 p-4 rounded-l-lg">
                                    <img
                                        src="/path/to/icon.png"
                                        alt="Icon"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">{lead.title}</h2>
                                    <p className="text-gray-600">{lead.city}, {lead.district}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewLeads;
