import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700 border-t">
            <div className="container mx-auto px-6 py-12">
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-xl font-bold text-gray-900">WorkBridge</h3>
                        <p className="mt-2 text-sm max-w-xs">
                            Find top-tier talent effortlessly. From entry-level to executive roles, we connect you with the right candidates.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">About</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#locations" className="hover:text-green-600">Locations</a></li>
                            <li><a href="#our-process" className="hover:text-green-600">Our Process</a></li>
                            <li><a href="#our-story" className="hover:text-green-600">Our Story</a></li>
                             <li><Link to="/careers" className="hover:text-green-600">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Menu</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#consultancy" className="hover:text-green-600">Consultancy</a></li>
                            <li><a href="#counselling" className="hover:text-green-600">Counselling</a></li>
                            <li><a href="#recruitment" className="hover:text-green-600">Recruitment</a></li>
                            <li><a href="#talent-sourcing" className="hover:text-green-600">Talent Sourcing</a></li>
                            <li><a href="#all-services" className="hover:text-green-600">See All Services</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Support</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#faq" className="hover:text-green-600">FAQs</a></li>
                            <li><a href="#help-center" className="hover:text-green-600">Help Center</a></li>
                            <li><a href="#contact-us" className="hover:text-green-600">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800">Socials</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><a href="#linkedin" className="hover:text-green-600">LinkedIn</a></li>
                            <li><a href="#instagram" className="hover:text-green-600">Instagram</a></li>
                            <li><a href="#x" className="hover:text-green-600">X</a></li>
                        </ul>
                    </div>
                 </div>
                 <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>&copy; 2024 Connecting Chains. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#legal" className="hover:text-green-600">Legal Notice</a>
                        <a href="#privacy" className="hover:text-green-600">Privacy Policy</a>
                        <a href="#terms" className="hover:text-green-600">Terms & Conditions</a>
                    </div>
                 </div>
            </div>
        </footer>
    );
};

export default Footer;