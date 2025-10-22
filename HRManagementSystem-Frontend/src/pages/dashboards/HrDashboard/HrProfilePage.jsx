// src/pages/dashboards/HrDashboard/HrProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { PencilIcon } from '../../../components/ui/Icons';
import profileImg from '../../../assets/Image/profileimg.png';

// Initial data to populate localStorage if it's empty
const initialProfileData = {
  fullName: 'Md Zakir Hussain',
  jobTitle: 'HR Manager',
  email: 'zakir.h@workbridge.com',
  phone: '+91-987-654-3210',
  department: 'Human Resources',
  location: 'Head Office - Mumbai',
  employeeId: 'WB-HR-001',
};

const HrProfilePage = () => {
  const [profileData, setProfileData] = useState(initialProfileData);
  const navigate = useNavigate(); // Initialize useNavigate

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('hrProfileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    } else {
      // If no data in localStorage, set it with the initial data
      localStorage.setItem('hrProfileData', JSON.stringify(initialProfileData));
    }
  }, []);

  const handleEditClick = () => {
    // Navigate to the edit page
    navigate('/hr/profile/edit');
  };

  return (
    <DashboardLayout
      role="hr"
      title="My Profile"
      userName={profileData.fullName}
      userEmail={profileData.email}
    >
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          
          <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">HR Profile Information</h2>
            <button
              onClick={handleEditClick} // Updated onClick handler
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <PencilIcon className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <img
                src={profileImg}
                alt="Profile Avatar"
                className="h-32 w-32 rounded-full object-cover mb-4 ring-4 ring-green-100"
              />
              <h3 className="text-xl font-bold text-gray-900">{profileData.fullName}</h3>
              <p className="text-md text-gray-500">{profileData.jobTitle}</p>
              <p className="text-sm text-gray-400 mt-1">ID: {profileData.employeeId}</p>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                <p className="text-lg text-gray-800">{profileData.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                <p className="text-lg text-gray-800">{profileData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                <p className="text-lg text-gray-800">{profileData.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                <p className="text-lg text-gray-800">{profileData.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Work Location</label>
                <p className="text-lg text-gray-800">{profileData.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HrProfilePage;