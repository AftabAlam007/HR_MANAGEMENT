import React from 'react';
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, UserGroupIcon } from '../ui/Icons';

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <span className="text-green-600 font-semibold text-sm">WHY CHOOSE US</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Maximize Your Potential with Strategic HR Solutions</h2>
                    <div className="relative mt-6">
                        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974" alt="Team meeting" className="rounded-lg shadow-lg w-full" />
                        <div className="absolute bottom-4 left-4 bg-white rounded-full shadow-md p-2 flex items-center space-x-2">
                            <div className="flex -space-x-2">
                                <img src="https://i.pravatar.cc/24?u=a" className="w-6 h-6 rounded-full border-2 border-white" alt="user a"/>
                                <img src="https://i.pravatar.cc/24?u=b" className="w-6 h-6 rounded-full border-2 border-white" alt="user b"/>
                                <img src="https://i.pravatar.cc/24?u=c" className="w-6 h-6 rounded-full border-2 border-white" alt="user c"/>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">Find the right talent for your team</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 space-y-8">
                     <div className="flex items-start space-x-4">
                        <CheckCircleIcon />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">Expert Team</h3>
                            <p className="text-gray-600 mt-1">Our team knows different industries inside out, ensuring tailored solutions for your needs.</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4">
                        <ClockIcon />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">Time Saving</h3>
                            <p className="text-gray-600 mt-1">We have connections all over India, bringing talent from everywhere to you.</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4">
                        <DocumentTextIcon />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">Quality Assurance</h3>
                            <p className="text-gray-600 mt-1">Every candidate we present is thoroughly screened to match your requirements perfectly.</p>
                        </div>
                    </div>
                     <div className="flex items-start space-x-4">
                        <UserGroupIcon />
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">Client Priority</h3>
                            <p className="text-gray-600 mt-1">We offer personalized service and clear communication every step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;