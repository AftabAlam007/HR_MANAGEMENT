import React from 'react';

const CTA = () => {
    return (
        <section className="bg-green-800 text-white">
            <div className="container mx-auto px-6 py-20 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold">Take Your Organization to Success Today!</h2>
                 <p className="mt-4 text-green-200 max-w-2xl mx-auto">
                   Contact us today to explore how our solutions and consulting services can drive growth and success for your organization.
                 </p>
                  <div className="mt-8">
                        <a href="#learn-more-cta" className="bg-white text-green-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                            Learn More
                        </a>
                    </div>
            </div>
        </section>
    );
};

export default CTA;