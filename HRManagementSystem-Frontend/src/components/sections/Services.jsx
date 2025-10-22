import React from 'react';

const Services = () => {
    return (
        <section className="py-20">
             <div className="container mx-auto px-6 text-center">
                <span className="text-green-600 font-semibold text-sm">OUR SERVICES</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Comprehensive Solutions for Your Success</h2>
             </div>
             <div className="container mx-auto px-6 mt-12 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/3 space-y-4">
                    <a href="#executive" className="block p-4 text-left border-b-2 border-gray-100 hover:bg-gray-50 flex justify-between items-center text-xl font-semibold text-gray-800">Executive Search <span>&rarr;</span></a>
                    <a href="#permanent" className="block p-4 text-left border-b-2 border-gray-100 hover:bg-gray-50 text-xl font-medium text-gray-500">Permanent Staffing</a>
                    <a href="#contract" className="block p-4 text-left border-b-2 border-gray-100 hover:bg-gray-50 text-xl font-medium text-gray-500">Contract Staffing</a>
                    <a href="#rpo" className="block p-4 text-left border-b-2 border-gray-100 hover:bg-gray-50 text-xl font-medium text-gray-500">Recruitment Process Outsourcing</a>
                </div>
                <div className="md:w-2/3">
                    <div className="relative rounded-lg overflow-hidden shadow-xl">
                        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070" alt="Executive Search" className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <h3 className="text-2xl font-bold">Executive Search</h3>
                            <p className="mt-2 max-w-md">Leveraging our extensive network and industry insights, we specialize in executive search services to help you secure visionary leaders who can drive your organization forward.</p>
                            <a href="#learn-more-es" className="mt-4 inline-block font-semibold hover:underline">Learn More</a>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    );
};

export default Services;