import React from 'react';

const Testimonials = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-6 text-center">
                <span className="text-green-600 font-semibold text-sm">TESTIMONIALS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Hear from Our Clients</h2>
            </div>
            <div className="container mx-auto px-6 mt-12 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full flex flex-col md:flex-row items-center gap-8">
                    <div className="relative md:w-1/3">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887" alt="Donald Juke" className="rounded-lg w-full h-auto"/>
                        <div className="absolute -bottom-3 -left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">20+ Talents Joined Nore Inc.</div>
                    </div>
                    <div className="md:w-2/3 text-left">
                        <p className="text-6xl text-green-500 font-serif -mt-4">“</p>
                        <p className="text-gray-700 italic text-lg -mt-4">
                        "WorkBridge provided exceptional recruitment services. They truly understood our needs and delivered top-notch candidates. Their personalized approach and attention to detail made the entire process smooth and efficient."
                        </p>
                        <p className="font-bold text-gray-900 mt-4">Donald Juke - CEO of Nore, Inc</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;