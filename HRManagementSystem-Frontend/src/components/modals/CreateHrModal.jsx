import React, { useState } from 'react';
import axios from 'axios'; // Import axios directly

const CreateHrModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    jobTitle: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetAndClose = () => {
    setFormData({ fullName: '', email: '', companyName: '', jobTitle: '', password: '' });
    setError('');
    setIsSubmitting(false);
    onClose();
  };
  
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password.length < 8) return setError("Temporary password must be at least 8 characters long.");
    
    setIsSubmitting(true);
    try {
        const payload = { ...formData, role: 'HR' };
        
        // Get the token from localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error("Authentication error. Please log in again.");
        }

        // Make the authenticated request using axios
        await axios.post('http://localhost:8080/api/users/create', payload, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        alert(`HR account for ${formData.fullName} created successfully.`);
        resetAndClose();

    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);
        } else {
            setError(err.message || 'Failed to create HR account.');
        }
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New HR Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            <input type="email" name="email" placeholder="Work Email" value={formData.email} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
            <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="mt-1 w-full p-2 border rounded" />
            <div>
                <label className="block text-sm font-medium text-gray-700">Temporary Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required minLength="8" />
                <p className="text-xs text-gray-500 mt-1">User will be required to change this on first login.</p>
            </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={resetAndClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-md text-white bg-green-700 hover:bg-green-800 disabled:bg-gray-400">
                {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateHrModal;