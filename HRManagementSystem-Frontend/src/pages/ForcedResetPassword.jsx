import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios directly
import { WorkBridgeLogoIcon } from '../components/ui/Icons';

const ForceResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, role } = location.state || {};

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!email || !role) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p>Invalid access. Please log in first.</p>
        </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) return setError("Passwords do not match.");
    if (newPassword.length < 8) return setError("Password must be at least 8 characters long.");

    setIsSubmitting(true);
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error("Authentication error. Please log in again.");
        }
        
        const response = await axios.post(
            'http://localhost:8080/api/users/force-reset-password', 
            { newPassword }, 
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        
        // The backend returns a new, permanent token. Store it.
        localStorage.setItem('authToken', response.data.token);

        alert("Password has been updated successfully!");
        const dashboardPath = `/${role}/dashboard`;
        navigate(dashboardPath);

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError(err.message || 'Failed to update password.');
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-8 py-10">
        <div className="text-center mb-8">
          <div className="text-green-700 text-3xl font-extrabold flex items-center justify-center">
            <WorkBridgeLogoIcon className="h-8 w-8 text-green-700" />
            WorkBridge
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Create Your New Password</h1>
          <p className="text-sm text-gray-500 mt-2">
            For security, you must create a new password for your account: <strong>{email}</strong>
          </p>
        </div>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center font-semibold text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-green-600" required />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border-transparent focus:outline-none focus:ring-2 focus:ring-green-600" required />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition duration-200 disabled:bg-gray-400">
            {isSubmitting ? 'Saving...' : 'Set Password and Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForceResetPassword;