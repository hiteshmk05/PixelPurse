import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import home_img from '../assets/images/home_page_main_banner_copy.jpg'; // Correct path
import { features } from '../data/features_data';
import { type_animation_seq } from '../data/type_animations';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-pink-100 relative"> {/* Gradient background */}

            <div className="flex flex-col items-center text-center py-8 px-6 relative pixelate pixelated-background">
                <h1 className="text-7xl font-pixel text-dark-purple mb-6 drop-shadow-md">
                    PixelPurse
                </h1>
                
                <TypeAnimation
                    sequence={type_animation_seq}
                    wrapper="span"
                    speed={60}
                    repeat={Infinity}
                    className="text-lg md:text-2xl lg:text-3xl font-medium text-near-black leading-relaxed mb-10 max-w-3xl"
                />

                <div className="flex flex-col lg:flex-row items-center justify-center w-full px-6 gap-12 lg:gap-20">
                    <div className="flex-1 flex justify-start relative">
                        <div className="p-4 overflow-hidden relative">
                            <img
                                src={home_img}
                                alt="Expense tracking illustration"
                                className="object-contain w-full h-auto relative z-10"
                            />

                            {/*  border at the top right */}
                            <div className="absolute top-0 right-0 w-1/3 h-4 bg-boundary-color z-20"></div>
                            <div className="absolute top-0 right-0 h-1/3 w-4 bg-boundary-color z-20"></div>

                            {/*  border at the bottom left */}
                            <div className="absolute bottom-0 left-0 w-1/3 h-4 bg-boundary-color z-20"></div>
                            <div className="absolute bottom-0 left-0 h-1/3 w-4 bg-boundary-color z-20"></div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center">
                        <p className="text-lg text-gray-700 mb-6 py-10">
                            Start managing your expenses today and gain full control over your finances.  
                            Organize your spending, set budget goals, and track every transaction effortlessly.  
                            Join thousands of users making smarter financial decisions with PixelPurse!
                        </p>
                        <Link to="/signup" className='unpixelated'>
                            <button className="bg-deep-lavendar border-2 
                                border-purple-700 rounded-md px-8 py-4 text-white text-lg font-semibold
                                shadow-md hover:scale-110 hover:shadow-lg 
                                transition-all duration-300 ease-in-out">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>

            </div>

            {/* New Section: Key Features */}
            <div className=" pixelate pixelated-background features-section py-10 bg-white z-0">
                <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8">Why Choose PixelPurse?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-item bg-purple-100 p-6 rounded-lg shadow-md text-center
                         relative ">
                        <h3 className="text-2xl font-semibold text-purple-700 mb-4">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

            </div>

            <div className="text-center py-16 bg-purple-700 text-white pixelate pixelated-background ">
                <h2 className="text-4xl font-semibold mb-6">Start Managing Your Expenses Today</h2>
                <p className="text-lg mb-8">Join thousands of users who are already taking control of their finances.
                    Get started now!</p>
                <Link to="/signup">
                    <button className="bg-white text-purple-700 px-6 py-3 rounded-md
                     text-lg font-semibold
                                shadow-md hover:scale-110 hover:shadow-lg 
                                transition-all duration-300 ease-in-out relative z-50 ">
                        Sign Up Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
