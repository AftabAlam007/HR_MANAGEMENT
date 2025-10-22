// src/pages/dashboards/HrDashboard/HrSettingsPage.js
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const HrSettingsPage = () => {
  // State to manage the HR user's personal settings
  const [personalSettings, setPersonalSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en-US',
  });

  // Handler to update state when a form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler to simulate saving the settings
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving HR Settings:", personalSettings);
    alert("Your settings have been saved successfully! (Simulated)");
    // In a real application, you would send this data to an API endpoint.
  };

  return (
    <DashboardLayout
      role="hr"
      title="Account Settings"
      userName="Zakir Hussain"
      userEmail="zakir.h@workbridge.com"
    >
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Account Settings</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* --- Notification Settings Section --- */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="emailNotifications" className="block font-medium text-gray-800">Email Notifications</label>
                  <p className="text-sm text-gray-500">Receive alerts for new applicants and leave requests in your inbox.</p>
                </div>
                <label htmlFor="emailNotifications" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      className="sr-only" // Hide the default checkbox
                      checked={personalSettings.emailNotifications}
                      onChange={handleChange}
                    />
                    <div className={`block w-14 h-8 rounded-full ${personalSettings.emailNotifications ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${personalSettings.emailNotifications ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>

            {/* --- Theme/Display Settings Section --- */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Display Preferences</h3>
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="darkMode" className="block font-medium text-gray-800">Enable Dark Mode</label>
                  <p className="text-sm text-gray-500">Switch the dashboard to a darker, eye-friendly theme.</p>
                </div>
                <label htmlFor="darkMode" className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="darkMode"
                      name="darkMode"
                      className="sr-only"
                      checked={personalSettings.darkMode}
                      onChange={handleChange}
                    />
                    <div className={`block w-14 h-8 rounded-full ${personalSettings.darkMode ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${personalSettings.darkMode ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-6 py-2 rounded-md font-semibold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HrSettingsPage;