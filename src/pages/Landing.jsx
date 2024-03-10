import React from 'react';
import Facts from '../components/landing/Facts';
import Hero from '../components/landing/Hero';
import Navbar from '../components/landing/Navbar';
import LogoRow from '../components/landing/LogoRow';

const Landing = () => {
    return (
        <>
            <div className="h-[100vh] flex flex-col overflow-x-hidden overflow-y-hidden">
                <div className="h-[100vh] flex flex-col">
                    <Navbar />
                    <Hero />
                    <Facts />
                </div>
            </div>

            <div className="h-screen site-bg overflow-y-hidden">
                <LogoRow />
            </div>
        </>
    );
};

export default Landing;
