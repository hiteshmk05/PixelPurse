import React from 'react';
import aboutData from '../data/aboutus_data';

const About = () => {
  return (
    <div className=" min-h-screen pixelate pixelated-background bg-gradient-to-r from-purple-100 to-pink-100 relative">
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-8 px-8 max-w-4xl mx-auto">

        <h1 className="text-5xl font-pixel text-purple-700 mb-6">
          {aboutData.heading}
        </h1>

        {aboutData.content.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-800 leading-relaxed mb-8">
            {paragraph}
          </p>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
          {aboutData.features.map((feature, index) => (
            <div key={index} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-purple-text">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
