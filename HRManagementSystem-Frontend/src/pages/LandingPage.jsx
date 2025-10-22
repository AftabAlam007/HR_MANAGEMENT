import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

const LandingPage = () => {
    return (
        <div className="bg-white font-sans">
            <Navbar />
            <main>
                <Hero />
                <WhyChooseUs />
                <Services />
                <About />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;