import React from 'react';
import { StarIcon } from '../ui/Icons';

const Hero = () => {
    return (
        <section className="bg-green-800 text-white py-20">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="inline-flex items-center bg-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <StarIcon /> <span className="ml-2">#1 HR Solution in the world</span>
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">Meet Your Talent Sourcing Needs Here</h2>
                    <p className="mt-4 text-green-200">
                        Find top-tier talent effortlessly. From entry-level to executive roles, we connect you with the right candidates.
                    </p>
                    <div className="mt-8">
                        <a href="#learn-more" className="bg-white text-green-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="relative">
                   <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white text-black p-4 rounded-lg shadow-lg space-y-3">
                          <h3 className="font-semibold">Talents</h3>
                          <div className="flex items-center space-x-3"><img src="https://i.pravatar.cc/40?u=1" className="w-10 h-10 rounded-full" alt="Albert Flores"/><div><p className="font-medium text-sm">Albert Flores</p><p className="text-xs text-gray-500">Software Engineer</p></div></div>
                          <div className="flex items-center space-x-3"><img src="https://i.pravatar.cc/40?u=2" className="w-10 h-10 rounded-full" alt="Eleanor Pena"/><div><p className="font-medium text-sm">Eleanor Pena</p><p className="text-xs text-gray-500">Senior Product Designer</p></div></div>
                          <div className="flex items-center space-x-3"><img src="https://i.pravatar.cc/40?u=3" className="w-10 h-10 rounded-full" alt="Jenny Wilson"/><div><p className="font-medium text-sm">Jenny Wilson</p><p className="text-xs text-gray-500">Interaction Designer</p></div></div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-center flex-col"><p className="font-bold text-lg">Talent Match!</p></div>
                          <div className="bg-white text-black p-4 rounded-lg shadow-lg space-y-2"><h3 className="font-semibold">Expertises</h3><div className="text-sm">Development <span className="text-gray-500">34+ Talents</span></div><div className="text-sm">Marketing <span className="text-gray-500">72+ Talents</span></div><div className="text-sm">Marketing <span className="text-gray-500">5+ Talents</span></div></div>
                        </div>
                     </div>
                   </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 flex justify-around items-center flex-wrap gap-8 text-gray-400">
                <span className="text-2xl font-semibold">Podium</span>
                <span className="text-2xl font-semibold">eventbrite</span>
                <span className="text-2xl font-semibold">hotjar</span>
                <span className="text-2xl font-semibold">attentive</span>
                <span className="text-2xl font-semibold">INTERCOM</span>
            </div>
        </section>
    );
};

export default Hero;