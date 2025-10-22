import React from 'react';
import { Link } from 'react-router-dom';
import { WorkBridgeLogoIcon } from '../ui/Icons';

const Navbar = () => {
    return (
        <header className="bg-green-800 text-white sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold flex items-center">
                    <WorkBridgeLogoIcon />
                    WorkBridge
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="hover:text-green-300 transition-colors">Home</Link>
                    <a href="/#solutions" className="hover:text-green-300 transition-colors">Solutions</a>
                    <a href="/#resources" className="hover:text-green-300 transition-colors">Resources</a>
                    <a href="/#company" className="hover:text-green-300 transition-colors">Company</a>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                        Login
                    </Link>
                    
                    {/* --- SIMPLIFIED SIGNUP BUTTON --- */}
                    <Link 
                        to="/signup/admin"
                        className="bg-white text-green-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        Signup
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;