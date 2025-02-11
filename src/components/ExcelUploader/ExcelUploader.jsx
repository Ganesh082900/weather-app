import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
    const [file, setFile] = useState(null);

    // Handle the file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Handle the file parsing and logging
    const handleFileUpload = () => {
        if (!file) {
            console.log('Please upload a file first.');
            return;
        }

        // Create a FileReader to read the uploaded file
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the first sheet is the one we want
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the sheet to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Log the JSON data to the console
            console.log(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="px-4 bg-gray-100 h-full overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Excel/Sheets Uploader</h2>

                <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer mb-4 focus:outline-none"
                />

                <button
                    onClick={handleFileUpload}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-300"
                >
                    Upload and Log JSON
                </button>
            </div>
        </div>
    );
};

export default ExcelUploader;
