import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa'; // Import icons

export const NavbarLinks = [
    {
        icon: <FaHome  />, 
        title: "Home",
        path: "/"
    },
    {
        icon: <FaInfoCircle />,
        title: "About Us",
        path: "/about"
    },
    {
        icon: <FaEnvelope />, 
        title: "Contact Us",
        path: "/contact-us"
    }
];
