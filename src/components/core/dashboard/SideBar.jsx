import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle, FaListAlt, FaMoneyBillWave } from "react-icons/fa";

const SideBar = () => {
    return (
      <div className="flex flex-col items-center relative pixelated pixelated-background ">
        {/* Trapezium Styled Sidebar with adjusted position */}

        <div>
        <div
          className="bg-gray-900 text-white py-4 px-20 rounded-b-lg relative "
          style={{
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)", // Trapezium shape
        //    ed to the screen
            top: "0px", // Start exactly below the navbar (adjust this to match the navbar height)
            left: 0,
            right: 0,
            // zIndex: 50,
            display: "flex", // Flexbox for centering content
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "45px", // Reduced height (adjust this value as needed)
          }}
        >
          <ul className="flex space-x-8"> {/* Horizontal layout */}
            <li>
              <NavLink to="/dashboard/profile" className="flex items-center space-x-2 hover:text-gray-300">
                <FaUserCircle size={20} />
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/categories" className="flex items-center space-x-2 hover:text-gray-300">
                <FaListAlt size={20} />
                <span>Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/expenses" className="flex items-center space-x-2 hover:text-gray-300">
                <FaMoneyBillWave size={20} />
                <span>Expenses</span>
              </NavLink>
            </li>

          </ul>
        </div>
        </div>

      </div>
    );
  };
  export default SideBar;