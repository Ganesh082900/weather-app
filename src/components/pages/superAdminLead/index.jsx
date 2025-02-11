import React, { useState } from 'react';
import ViewLeads from '../viewLeads';
import CreateLead from '../createLead';

const SuperAdminLead = () => {
    const [activeTab, setActiveTab] = useState('viewLeads');

    return (
        <div className="h-[84vh] flex flex-col bg-gray-100">
            <div className="flex justify-around h-12 border-b border-gray-300">
                <button
                    className={`flex-1 flex justify-center items-center border-b-4 ${activeTab === 'viewLeads' ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                    onClick={() => setActiveTab('viewLeads')}
                >
                    View Leads
                </button>
                <button
                    className={`flex-1 flex justify-center items-center border-b-4 ${activeTab === 'createLead' ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                    onClick={() => setActiveTab('createLead')}
                >
                    Create Lead
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                {activeTab === 'viewLeads' ? <ViewLeads /> : <CreateLead />}
            </div>
        </div>
    );
};

export default SuperAdminLead;
