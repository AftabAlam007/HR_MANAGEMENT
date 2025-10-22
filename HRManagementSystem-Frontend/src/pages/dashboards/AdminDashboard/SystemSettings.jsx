import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const SystemSettingsPage = () => {
  const [settings, setSettings] = useState({
    publicRegistration: true,
    defaultUserRole: 'Employee',
    minPasswordLength: 10,
    twoFactorAuthEnabled: false,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving System Settings:", settings);
    alert("System settings saved successfully! (Simulated)");
    // In a real app, send to API
  };

  return (
    <DashboardLayout
        role="admin"
        title="System Settings"
        userName="System Admin"
        userEmail="admin@workbridge.com"
    >
        <div className="p-8">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Platform Configuration</h2>
                <p className="text-gray-600 mb-6">
                    Manage global settings for the application, including security, user defaults, and feature toggles.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">General</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="publicRegistration"
                                checked={settings.publicRegistration}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="publicRegistration" className="ml-2 block text-sm text-gray-900">
                                Allow public registration for new users
                            </label>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="defaultUserRole" className="block text-sm font-medium text-gray-700">Default New User Role</label>
                            <select
                                name="defaultUserRole"
                                id="defaultUserRole"
                                value={settings.defaultUserRole}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            >
                                <option>Employee</option>
                                <option>HR Manager</option>
                            </select>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Security</label>
                        <div className="mt-2">
                            <label htmlFor="minPasswordLength" className="block text-sm font-medium text-gray-700">Minimum Password Length</label>
                            <input
                                type="number"
                                name="minPasswordLength"
                                id="minPasswordLength"
                                value={settings.minPasswordLength}
                                onChange={handleChange}
                                min="6"
                                max="32"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                name="twoFactorAuthEnabled"
                                checked={settings.twoFactorAuthEnabled}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="twoFactorAuthEnabled" className="ml-2 block text-sm text-gray-900">
                                Enable Two-Factor Authentication (2FA) for all users
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notifications & Features</label>
                        <div className="flex items-center mt-2">
                            <input
                                type="checkbox"
                                name="emailNotifications"
                                checked={settings.emailNotifications}
                                onChange={handleChange}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                                Enable system-wide email notifications
                            </label>
                        </div>
                         <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                name="maintenanceMode"
                                checked={settings.maintenanceMode}
                                onChange={handleChange}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
                                Activate Maintenance Mode (Users will see a maintenance page)
                            </label>
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

export default SystemSettingsPage;