import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/pixelated_money.jpg'; // Your logo path

const Footer = () => {
  return (
    <div className="pixelate pixelated-background relative bg-footer-color text-black py-8">
      {/* <div className="absolute inset-0"></div> */}

      <div className="relative z-10 max-w-screen-xl mx-auto px-6">
  
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-24 h-auto" />
            <p className="text-lg font-semibold">Your expense tracker solution, PixelPurse!</p>
          </div>
          
          {/* Social or action links */}
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-purple-500 transition">About Us</Link>
            <Link to="/contact-us" className="hover:text-purple-500 transition">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-purple-500 transition">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-purple-500 transition">Terms of Service</Link>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} PixelPurse. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
