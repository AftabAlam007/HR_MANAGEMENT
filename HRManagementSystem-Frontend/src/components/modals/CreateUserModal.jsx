import React, { useState } from 'react';
import axios from 'axios';

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [onboardingMethod, setOnboardingMethod] = useState('invite');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resultMessage, setResultMessage] = useState(''); // Only need a message now

    const resetAndClose = () => {
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setOnboardingMethod('invite');
        setError('');
        setResultMessage('');
        onClose();
    };
    if (!isOpen) return null;
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('authToken');
            const payload = {
                fullName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                role: 'USER',
                onboardingMethod,
            };

            if (onboardingMethod === 'temp') {
                if (formData.password.length < 8) throw new Error("Temp password must be >= 8 chars.");
                payload.password = formData.password;
            }

            const response = await axios.post('http://localhost:8080/api/users/create', payload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Set the success message from the backend's response
            setResultMessage(response.data.message || 'User created successfully.');
            if (onboardingMethod === 'temp') {
                onUserCreated(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                {!resultMessage ? (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New User</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className="w-full p-2 border rounded"/>
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className="w-full p-2 border rounded"/>
                            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded"/>
                            
                            <div className="border-t pt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Onboarding Method</label>
                                <div className="flex items-center space-x-6">
                                    <label className="flex items-center gap-2"><input type="radio" value="invite" checked={onboardingMethod === 'invite'} onChange={e => setOnboardingMethod(e.target.value)} /> Send Invitation</label>
                                    <label className="flex items-center gap-2"><input type="radio" value="temp" checked={onboardingMethod === 'temp'} onChange={e => setOnboardingMethod(e.target.value)} /> Set Temp Password</label>
                                </div>
                            </div>

                            {onboardingMethod === 'temp' && (
                                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Temporary Password (min 8 chars)" required className="w-full p-2 border rounded"/>
                            )}

                            <div className="flex justify-end space-x-4 pt-4">
                                <button type="button" onClick={resetAndClose} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded bg-green-600 text-white disabled:bg-gray-400">
                                    {isSubmitting ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold text-green-700">Success!</h2>
                        <p className="text-gray-600 my-4">{resultMessage}</p>
                        <button onClick={resetAndClose} className="mt-4 w-full p-2 bg-gray-200 rounded">Done</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateUserModal;