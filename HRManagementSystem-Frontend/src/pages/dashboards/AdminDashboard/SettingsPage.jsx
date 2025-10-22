import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const SettingsPage = () => {
  const [personalSettings, setPersonalSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en-US',
    timezone: 'UTC',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Personal Settings:", personalSettings);
    alert("Personal settings saved successfully! (Simulated)");
    // In a real app, send to API
  };

  return (
    <DashboardLayout
        role="admin"
        title="Account Settings"
        userName="System Admin"
        userEmail="admin@workbridge.com"
    >
        <div className="p-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Account Preferences</h2>
                <p className="text-gray-600 mb-6">
                    Manage your personal settings, including notifications, display preferences, and regional options.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notifications</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={personalSettings.emailNotifications}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                                Receive email notifications for important updates
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Display</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="darkMode"
                                checked={personalSettings.darkMode}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-900">
                                Enable Dark Mode
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Regional Settings</label>
                        <div className="mt-2">
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                            <select
                                name="language"
                                id="language"
                                value={personalSettings.language}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            >
                                <option value="en-US">English (US)</option>
                                <option value="en-GB">English (UK)</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                            <select
                                name="timezone"
                                id="timezone"
                                value={personalSettings.timezone}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">America/New_York</option>
                                <option value="Europe/London">Europe/London</option>
                                <option value="Asia/Tokyo">Asia/Tokyo</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-5">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default SettingsPage;