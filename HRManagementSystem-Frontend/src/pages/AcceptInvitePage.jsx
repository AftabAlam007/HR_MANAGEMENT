import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { WorkBridgeLogoIcon } from '../components/ui/Icons';

const AcceptInvitePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) return setError("Passwords do not match.");
        if (password.length < 8) return setError("Password must be at least 8 characters long.");
        if (!token) return setError("Invalid or missing invitation token.");

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:8080/auth/accept-invite', { token, password });
            
            localStorage.setItem('authToken', response.data.token);
            alert("Account activated successfully! You are now logged in.");
            navigate('/user/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <div className="flex justify-center text-green-700"><WorkBridgeLogoIcon /></div>
                    <h1 className="text-2xl font-bold mt-2">Activate Your WorkBridge Account</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a New Password" required className="w-full p-2 border rounded"/>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required className="w-full p-2 border rounded"/>
                    <button type="submit" disabled={isSubmitting} className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400">
                        {isSubmitting ? 'Activating...' : 'Activate and Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AcceptInvitePage;