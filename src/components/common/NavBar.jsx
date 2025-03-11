import React, { useEffect } from 'react';
import logo from "../../assets/images/logo_transparent_2.png";
import { NavbarLinks } from '../../data/navbar_links';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, verifyToken } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";  
import SideBar from "../core/dashboard/SideBar";

const NavBar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) 
            dispatch(verifyToken(token));
    }, []);
    // const isDashboardPage = location.pathname.startsWith("/dashboard");

    return (
        <div>
        <div className="bg-navbar-color flex items-center justify-between w-full px-4 py-1">
            {/* Logo */}
            <div className="flex items-center">
            <Link to="/">
                <img src={logo} alt="Logo" className="w-14 h-auto ml-10" />
            </Link>
            </div>

            {/* Navbar Links (Home, About, Contact) */}
            <div className="flex space-x-6 ml-8">
            <nav>
                <ul className="flex space-x-6">
                {NavbarLinks.map((link, index) => (
                    <li key={index} className="flex items-center space-x-2">
                    <NavLink
                        to={link?.path}
                        className={({ isActive }) =>
                        isActive ? "text-clicked-25" : "text-yellow-25"
                        }>
                        <div className="flex items-center space-x-2">
                        <span
                            className={`text-xl ${
                            location.pathname === link.path
                                ? "text-clicked-25"
                                : "text-yellow-25"
                            }`}>
                            {link.icon}
                        </span>
                        <p>{link.title}</p>
                        </div>
                    </NavLink>
                    </li>
                ))}
                {token !== null && (
                    <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                        isActive ? "text-clicked-25" : "text-yellow-25"
                        }
                    >
                        <div className="flex items-center space-x-2">
                        <span
                            className={`text-xl ${
                            location.pathname === "/dashboard"
                                ? "text-clicked-25"
                                : "text-yellow-25"
                            }`}
                        >
                            <MdOutlineDashboard />
                        </span>
                        <p>Dashboard</p>
                        </div>
                    </NavLink>
                    </li>
                )}
                </ul>
            </nav>
            </div>

            {/* Login, Signup, Logout and User Image */}
            <div className="flex items-center space-x-4 mr-5">
            {token === null && (
                <>
                <NavLink to="/login">
                    <button className="bg-button-color text-purple-700 px-2 py-1
                    rounded-md shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300
                     ease-in-out border-2 border-button-color relative z-50">
                    Login
                    </button>
                </NavLink>
                <NavLink to="/signup">
                    <button className="bg-button-color text-purple-700 px-2 py-1
                    rounded-md shadow-md hover:scale-110 hover:shadow-lg border-button-color
                     transition-all duration-300 ease-in-out border-2 relative z-50">
                    Signup
                    </button>
                </NavLink>
                </>
            )}

            {token !== null && (
                <>
                <button
                    onClick={() => {
                    dispatch(logout(navigate));
                    }}
                    className="bg-button-color text-purple-700 px-2 py-1 rounded-md 
                    shadow-md hover:scale-110 hover:shadow-lg border-button-color transition-all 
                    duration-300 ease-in-out border-2 relative z-50">
                    Logout
                </button>
                <img src={user.image} alt="User" className="w-10 h-10 ml-5 rounded-full" />
                </>
            )};
            </div>
        </div>

        {/* {token !== null && isDashboardPage && <SideBar />} */}
        </div>
    );
};

export default NavBar;
