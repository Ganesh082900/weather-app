import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

const CreateLead = () => {
    return (
        <div className="h-[84vh] bg-gray-100 flex flex-col">

            <div className="grid grid-cols-2 gap-4 p-4">
                <Link to="create/school" className="bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <img src="/path/to/school-icon.png" alt="School" className="mx-auto mb-2 w-12 h-12" />
                        <p>School</p>
                    </div>
                </Link>
                <Link to="create/franchise" className="bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <img src="/path/to/franchise-icon.png" alt="Franchise" className="mx-auto mb-2 w-12 h-12" />
                        <p>Franchise</p>
                    </div>
                </Link>
                <Link to="create/franchise-agent" className="bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <img src="/path/to/franchise-agent-icon.png" alt="Franchise Agent" className="mx-auto mb-2 w-12 h-12" />
                        <p>Franchise Agent</p>
                    </div>
                </Link>
                <Link to="create/school-agent" className="bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <img src="/path/to/school-agent-icon.png" alt="School Agent" className="mx-auto mb-2 w-12 h-12" />
                        <p>School Agent</p>
                    </div>
                </Link>
                <Link to="create/rep" className="bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <img src="/path/to/rep-icon.png" alt="REP" className="mx-auto mb-2 w-12 h-12" />
                        <p>REP</p>
                    </div>
                </Link>
                <Link to="create/b2c" className="bg-blue-500 text-white p-6 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <img src="/path/to/b2c-icon.png" alt="B2C" className="mx-auto mb-2 w-12 h-12" />
                        <p>B2C</p>
                    </div>
                </Link>
            </div>

            {/* Routes for the forms */}
            <Routes>
                <Route path="school" element={<SchoolForm />} />
                <Route path="franchise" element={<FranchiseForm />} />
                <Route path="franchise-agent" element={<FranchiseAgentForm />} />
                <Route path="school-agent" element={<SchoolAgentForm />} />
                <Route path="rep" element={<RepForm />} />
                <Route path="b2c" element={<B2CForm />} />
            </Routes>
        </div>
    );
};

// Dummy components for forms
const SchoolForm = () => <div>School Form</div>;
const FranchiseForm = () => <div>Franchise Form</div>;
const FranchiseAgentForm = () => <div>Franchise Agent Form</div>;
const SchoolAgentForm = () => <div>School Agent Form</div>;
const RepForm = () => <div>REP Form</div>;
const B2CForm = () => <div>B2C Form</div>;

export default CreateLead;
