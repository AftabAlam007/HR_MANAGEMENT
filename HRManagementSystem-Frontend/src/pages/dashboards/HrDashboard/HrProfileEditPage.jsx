// src/pages/dashboards/HrDashboard/HrProfileEditPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const HrProfileEditPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        department: '',
        location: '',
        employeeId: '',
    });
    
    // On component mount, load the data from localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('hrProfileData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the updated data to localStorage to simulate persistence
        localStorage.setItem('hrProfileData', JSON.stringify(formData));
        alert("Profile updated successfully!");
        navigate('/hr/profile'); // Navigate back to the profile view page
    };

    return (
        <DashboardLayout
            role="hr"
            title="Edit Profile"
            userName={formData.fullName || "Zakir Hussain"}
            userEmail={formData.email || "zakir.h@workbridge.com"}
        >
            <div className="p-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            </div>
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input type="text" name="jobTitle" id="jobTitle" value={formData.jobTitle} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Work Location</label>
                                <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email Address (Read-only)</label>
                                <input type="email" name="email" id="email" value={formData.email} readOnly className="mt-1 w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" />
                            </div>
                             <div>
                                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-500">Employee ID (Read-only)</label>
                                <input type="text" name="employeeId" id="employeeId" value={formData.employeeId} readOnly className="mt-1 w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" />
                            </div>
                        </div>

                        {/* --- Action Buttons --- */}
                        <div className="pt-4 flex justify-end space-x-4">
                            <button type="button" onClick={() => navigate('/hr/profile')} className="px-6 py-2 rounded-md font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="px-6 py-2 rounded-md font-semibold text-white bg-green-700 hover:bg-green-800 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HrProfileEditPage;