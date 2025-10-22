import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, HomeIcon, WorkBridgeLogoIcon } from '../components/ui/Icons';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organizationName: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");
    if (formData.password.length < 8) return setError("Password must be at least 8 characters long.");
    if (!formData.agreeTerms) return setError("You must agree to the Administrator Agreement.");

    setIsSubmitting(true);
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock successful registration
        const mockToken = 'mock-admin-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);

        alert("Admin account created successfully! You are now being logged in.");
        navigate('/admin/dashboard');

    } catch (err) {
        setError('Registration failed. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto lg:grid lg:grid-cols-2 rounded-xl shadow-lg overflow-hidden relative">
        <Link 
            to="/" 
            className="absolute top-4 right-4 text-gray-500 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
            aria-label="Back to Home"
        >
            <HomeIcon className="h-5 w-5" />
        </Link>
        <div 
          className="hidden lg:flex flex-col items-center justify-center p-12 bg-cover bg-center text-white"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070')" }}
        >
            <h1 className="text-4xl font-bold mb-3">Administrator Control</h1>
            <p className="text-center max-w-sm">
                Register as the first administrator for your organization.
            </p>
        </div>
        <div className="bg-white p-8 md:p-10">
            <div className="text-center mb-8">
                <Link to="/" className="flex items-center justify-center text-gray-800 hover:text-green-700 transition-colors mb-4">
                    <WorkBridgeLogoIcon />
                    <span className="text-2xl font-bold">WorkBridge</span>
                </Link>
                <div className="flex justify-center mb-2"><ShieldCheckIcon /></div>
                <h1 className="text-3xl font-bold text-gray-800">Create Admin Account</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
                <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
                <input type="text" name="organizationName" placeholder="Organization Name" value={formData.organizationName} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
                {/* The Registration Key field has been removed from the form */}
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="mt-1 w-full p-2 border rounded" required />
                <div className="flex items-start"><div className="flex items-center h-5"><input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" /></div><div className="ml-3 text-sm"><label htmlFor="agreeTerms" className="font-medium text-gray-700">I agree to the <a href="#" className="text-green-600 hover:underline">Terms & Conditions</a></label></div></div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 disabled:bg-gray-400">
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};
export default AdminSignup;