import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditUserModal = ({ isOpen, onClose, userId, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    jobTitle: '',
    role: 'USER',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(false);

  // When the modal opens and we have a userId, fetch that user's data
  useEffect(() => {
    if (isOpen && userId) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          // Populate the form with all the fetched data
          setFormData({
            fullName: response.data.fullName || '',
            email: response.data.email || '',
            jobTitle: response.data.jobTitle || '',
            role: response.data.role || 'USER',
            status: response.data.status || 'ACTIVE',
          });
        } catch (err) {
          toast.error("Failed to fetch user data.");
          onClose(); // Close modal on error
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isOpen, userId, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = axios.put(`http://localhost:8080/api/users/${userId}`, formData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    });

    toast.promise(promise, {
      loading: 'Updating user...',
      success: (response) => {
        onUserUpdated(response.data); // Pass updated user back to the parent page
        onClose(); // Close the modal
        return 'User updated successfully!';
      },
      error: (err) => `Error: ${err.response?.data?.message || err.message}`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit User (ID: {userId})</h2>
        {loading ? (
          <p className="text-center p-8">Loading user details...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md"/>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md">
                <option value="USER">USER</option>
                <option value="HR">HR</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md">
                <option value="ACTIVE">ACTIVE</option>
                <option value="PENDING">PENDING</option>
                {/* You could add more statuses here if your backend supports them, e.g., LOCKED */}
              </select>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUserModal;