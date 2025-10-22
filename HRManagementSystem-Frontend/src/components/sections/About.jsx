import React from 'react';

const About = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12">
                <div className="md:w-1/2">
                    <span className="text-green-600 font-semibold text-sm">WHO WE ARE</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Your Trusted Partner in HR Excellence</h2>
                    <p className="mt-4 text-gray-600">
                        We are a team of seasoned HR professionals dedicated to helping businesses thrive through strategic HR management. With years of experience and a commitment to excellence, we tailor solutions to meet your unique needs.
                    </p>
                     <div className="mt-8">
                        <a href="#learn-more" className="border border-green-600 text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="relative">
                       <img src="https://images.unsplash.com/photo-1580894732444-8ec163ae3999?q=80&w=2070" className="rounded-lg shadow-lg w-full" alt="HR Consultant"/>
                       <div className="absolute bottom-4 left-4 bg-white p-2 rounded-full flex items-center space-x-3 shadow-md">
                          <img src="https://i.pravatar.cc/40?u=alex" className="w-10 h-10 rounded-full" alt="Alex Hambert"/>
                          <div>
                             <p className="text-sm font-semibold">Alex Hambert</p>
                             <p className="text-xs text-gray-500">HR Consultant</p>
                          </div>
                          <button className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-200">Book Call</button>
                       </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                    <p className="text-5xl font-bold text-green-600">4,400</p>
                    <p className="text-gray-600 mt-2">Talent Hired</p>
                </div>
                <div>
                    <p className="text-5xl font-bold text-green-600">50+</p>
                    <p className="text-gray-600 mt-2">Companies Work</p>
                </div>
                <div>
                    <p className="text-5xl font-bold text-green-600">95%</p>
                    <p className="text-gray-600 mt-2">Average Satisfied</p>
                </div>
            </div>
        </section>
    );
};

export default About;