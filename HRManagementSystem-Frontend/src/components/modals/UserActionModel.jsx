import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { generateStrongPassword } from '../utils/PasswordGenerator'; // Corrected the path

const UserActionModal = ({ isOpen, onClose, mode = 'create', userId = null, onComplete }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    role: 'USER',
    status: 'ACTIVE',
    password: '',
  });
  const [onboardingMethod, setOnboardingMethod] = useState('invite');
  const [loading, setLoading] = useState(false);

  const isEditMode = mode === 'edit';

  useEffect(() => {
    // This effect now correctly fetches user data when in 'edit' mode
    if (isOpen && isEditMode && userId) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setFormData({ ...formData, ...response.data });
        } catch (err) {
          toast.error("Failed to fetch user data.");
          onClose();
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
    // Reset form when modal is closed or switches mode
    if (!isOpen) {
      setFormData({ fullName: '', email: '', jobTitle: '', role: 'USER', status: 'ACTIVE', password: '' });
      setOnboardingMethod('invite');
    }
  }, [isOpen, isEditMode, userId, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(12);
    setFormData({ ...formData, password: newPassword });
    toast.success("New temporary password generated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    let promise;
    let successMessage = '';

    if (isEditMode) {
      // --- EDIT LOGIC ---
      const updatePayload = {
        fullName: formData.fullName,
        email: formData.email,
        jobTitle: formData.jobTitle,
        role: formData.role,
        status: formData.status,
      };
      promise = axios.put(`http://localhost:8080/api/users/${userId}`, updatePayload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      successMessage = 'User updated successfully!';
    } else {
      // --- CREATE LOGIC ---
      const createPayload = {
        fullName: formData.fullName,
        email: formData.email,
        jobTitle: formData.jobTitle,
        role: formData.role,
        onboardingMethod,
      };
      if (onboardingMethod === 'temp') {
        if (formData.password.length < 8) {
          toast.error("Temporary password must be >= 8 characters.");
          return;
        }
        createPayload.password = formData.password;
        successMessage = "User created! They will receive an email with their credentials.";
      } else {
        successMessage = "Invitation email has been sent successfully!";
      }
      promise = axios.post('http://localhost:8080/api/users/create', createPayload, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
    
    toast.promise(promise, {
      loading: isEditMode ? 'Updating user...' : 'Creating user...',
      success: (response) => {
        onComplete(response.data);
        onClose();
        return successMessage;
      },
      error: (err) => `Error: ${err.response?.data?.message || err.message}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isEditMode ? `Edit User (ID: ${userId})` : 'Create New User'}
        </h2>
        {loading ? ( <p className="text-center p-8">Loading...</p> ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full p-2 border rounded"/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded"/>
            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" className="w-full p-2 border rounded"/>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Annual Salary (INR)</label>
              <input type="number" name="salary" id="salary" value={formData.salary} onChange={handleChange} placeholder="e.g., 800000" required className="mt-1 w-full p-2 border rounded"/>
            </div>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="USER">User</option>
                <option value="HR">HR Manager</option>
                <option value="ADMIN">Administrator</option>
            </select>
            {isEditMode && (
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="ACTIVE">Active</option>
                    <option value="PENDING">Pending</option>
                </select>
            )}
            {!isEditMode && (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Onboarding Method</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" value="invite" checked={onboardingMethod === 'invite'} onChange={e => setOnboardingMethod(e.target.value)} /> Send Invitation</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" value="temp" checked={onboardingMethod === 'temp'} onChange={e => setOnboardingMethod(e.target.value)} /> Set Temp Password</label>
                        </div>
                    </div>
                    {onboardingMethod === 'invite' && (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                            An email will be sent to the user with a secure link to create their own password.
                        </div>
                    )}
                    {onboardingMethod === 'temp' && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                            The user will receive an email with this password and must change it on first login.
                            <div className="relative mt-2">
                                <input type="text" name="password" value={formData.password} onChange={handleChange} placeholder="Enter or generate a password" required className="w-full p-2 pr-24 border rounded"/>
                                <button type="button" onClick={handleGeneratePassword} className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded hover:bg-gray-300">Auto-Generate</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
                {isEditMode ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default UserActionModal;