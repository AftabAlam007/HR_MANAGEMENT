import React, { useState } from 'react';
// Make sure this path is correct for your project structure
import DashboardLayout from '../../../components/layout/DashboardLayout'; 

const UserSettings = () => {
  // State and handlers for the settings page would go here
  const [personalSettings, setPersonalSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en-US',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved! (Simulated)");
  };

  return (
    // The page now includes its own layout
    <DashboardLayout
      role="user"
      title="Settings"
      userName="Aftab Alam" // This could come from a global state/context later
      userEmail="user@workbridge.com"
    >
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Example Setting: Dark Mode */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">Enable Dark Mode</label>
                <p className="text-xs text-gray-500">Switch to a darker theme for your dashboard.</p>
              </div>
              <input
                type="checkbox"
                name="darkMode"
                checked={personalSettings.darkMode}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
            </div>
            {/* Example Setting: Notifications */}
            <div className="flex items-center justify-between border-b pb-4">
               <div>
                <label className="block text-sm font-medium text-gray-900">Email Notifications</label>
                <p className="text-xs text-gray-500">Receive updates and alerts in your inbox.</p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={personalSettings.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
            </div>
            <div className="pt-5 text-right">
              <button type="submit" className="px-6 py-2 rounded-md text-sm font-medium text-white bg-green-700 hover:bg-green-800">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;