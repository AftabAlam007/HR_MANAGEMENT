import React, { useState } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    fullName: 'System Admin',
    email: 'admin@workbridge.com', // Often read-only for primary admin email
    phoneNumber: '+1-555-123-4567',
    department: 'IT/Operations',
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Saving Profile Data:", profileData);
    alert("Profile updated successfully! (Simulated)");
    // In a real app, send profileData to API
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordChangeError('');

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) { // Example password policy
      setPasswordChangeError("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword === currentPassword) {
        setPasswordChangeError("New password cannot be the same as the current password.");
        return;
    }

    console.log("Changing Password (Simulated):", { currentPassword, newPassword });
    alert("Password changed successfully! (Simulated)");
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    // In a real app, send password change request to API
  };

  return (
    <DashboardLayout
        role="admin"
        title="My Profile"
        userName="System Admin"
        userEmail="admin@workbridge.com"
    >
        <div className="p-8">
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin Profile Information</h2>
                <p className="text-gray-600 mb-6">
                    View and update your personal administrator details.
                </p>

                <form onSubmit={handleSaveProfile} className="space-y-6 max-w-xl">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={profileData.fullName}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={profileData.email}
                            readOnly // Often the primary email is read-only or requires a more complex change process
                            className="mt-1 block w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md shadow-sm sm:text-sm"
                        />
                         <p className="mt-1 text-sm text-gray-500">Contact admin to change primary email.</p>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={profileData.phoneNumber}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <input
                            type="text"
                            name="department"
                            id="department"
                            value={profileData.department}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                    </div>
                    <div className="pt-5">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Change Password</h2>
                <p className="text-gray-600 mb-6">
                    Update your password to ensure account security.
                </p>

                <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
                    {passwordChangeError && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {passwordChangeError}
                        </div>
                    )}
                    <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="pt-5">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </DashboardLayout>
  );
};

export default ProfilePage;