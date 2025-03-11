// import React from 'react';
// import ProgressBar from '../../../common/ProgressBar';
// const CategoryCard = ({category}) => {
//     return (

//         <div className="flex items-center w-full"> 
//             <div className="w-24"> {/* Fixed width for progress bar */}
//                 <ProgressBar paid={category.expenses.paid} unpaid={category.expenses.unpaid} />
//             </div>
//             <div className="flex-grow pl-4"> {/* Added padding and flex-grow for category name */}
//                 <span>{category.categoryName}</span>
//             </div>
//             <div className="w-48"> {/* Fixed width for description */}
//                 <span>{category.description}</span>
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;
// import React from "react";
// import ProgressBar from "../../../common/ProgressBar";

// const CategoryCard = ({ category }) => {
//     return (
//         <div className="flex items-center w-full">
//             {/* Progress Bar */}
//             <div className="w-24 flex justify-center">
//                 <ProgressBar paid={category.expenses.paid} unpaid={category.expenses.unpaid} />
//             </div>
//             {/* Category Name */}
//             <div className="flex-grow text-left pl-4 truncate">
//                 <span className="font-medium text-gray-800">{category.categoryName}</span>
//             </div>
//             {/* Description */}
//             <div className="w-48 truncate text-gray-600">
//                 <span>{category.description}</span>
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;




// import React from 'react';
// import ProgressBar from '../../../common/ProgressBar';

// const CategoryCard = ({ category }) => {
//     return (
//         <div className="flex items-center w-full p-4 border-b bg-white shadow-sm rounded-md hover:bg-gray-50 transition-all duration-300">
//             {/* Progress Bar */}
//             <div className="flex flex-1 justify-center">
//                 <ProgressBar paid={category.expenses.paid} unpaid={category.expenses.unpaid} />
//             </div>

//             {/* Category Name */}
//             <div className="flex-1 flex justify-center">
//                 <span className="font-semibold text-lg text-gray-800">{category.categoryName}</span>
//             </div>

//             {/* Description */}
//             <div className="flex flex-1 text-gray-600 justify-center">
//                 <span>{category.description}</span>
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;

// import React from 'react';
// import ProgressBar from '../../../common/ProgressBar';

// const CategoryCard = ({ category }) => {
//     return (
//         <div className="flex relative items-center w-full p-4 border-b bg-[#B4A7FF] hover:bg-[#A393E6] 
//         shadow-md rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
//             {/* Progress Bar */}
//             <div className="flex flex-1 justify-center">
//                 <ProgressBar paid={category.expenses.paid} unpaid={category.expenses.unpaid} />
//             </div>

//             {/* Category Name */}
//             <div className="flex-1 flex justify-center">
//                 <span className="font-semibold text-lg text-gray-900">{category.categoryName}</span>
//             </div>

//             {/* Description */}
//             <div className="flex flex-1 text-gray-700 justify-center">
//                 <span>{category.description}</span>
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;

// import React, { useState } from "react";
// import ProgressBar from "../../../common/ProgressBar";

// const CategoryCard = ({ category }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <div 
//             className="relative flex items-center w-full p-4 border-b bg-[#B4A7FF] hover:bg-[#B89EFF] 
//             shadow-md rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Progress Bar */}
//             <div className="flex flex-1 justify-center">
//                 <ProgressBar 
//                     paid={category.expenses.paid} 
//                     unpaid={category.expenses.unpaid} 
//                     isHovered={isHovered}  // Passing hover state as a prop
//                 />
//             </div>

//             {/* Category Name */}
//             <div className="flex-1 flex justify-center">
//                 <span className="font-semibold text-lg text-gray-900">{category.categoryName}</span>
//             </div>

//             {/* Description */}
//             <div className="flex flex-1 text-gray-700 justify-center">
//                 <span>{category.description}</span>
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;
// import React, { useState } from "react";
// import ProgressBar from "../../../common/ProgressBar";

// const CategoryCard = ({ category }) => {

//     return (
//         <div 
//             className="w-full max-w-sm p-5 bg-[#29303a] hover:bg-[#FFFFFF] 
//             shadow-md rounded-lg transition-all duration-300 ease-in-out 
//             transform hover:scale-105 hover:shadow-lg h-auto flex flex-col justify-between"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* Progress Bar */}
//             <div className="flex justify-center mb-3">
//                 <ProgressBar 
//                     paid={category.expenses.paid} 
//                     unpaid={category.expenses.unpaid} 
//                     isHovered={isHovered} 
//                 />
//             </div>

//             {/* Category Name */}
//             <div className="text-center font-semibold text-lg text-gray-300">
//                 {category.categoryName}
//             </div>

//             {/* Description */}
//             <div className="text-center text-gray-400 mt-2">
//                 {category.description}
//             </div>
//         </div>
//     );
// };

// export default CategoryCard;


import React, { useState } from "react";
import ProgressBar from "../../../common/ProgressBar";
// import { formatDate } from "../../../utils/formatDate";
import { formatDate } from "../../../../services/dateFormatter";

const CategoryCard = ({ category }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className="w-full max-w-sm p-5 bg-[#29303a] group hover:bg-slate-200 
            shadow-md rounded-lg transition-all duration-300 ease-in-out 
            transform hover:scale-105 hover:shadow-lg h-auto flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="text-left font-bold text-gray-400 group-hover:text-gray-900 mb-3"> {/* Added margin bottom */}
                {/* <span className="text-gray-300 group-hover:text-black">Progress: </span> */}
                <ProgressBar 
                    paid={category.expenses.paid} 
                    unpaid={category.expenses.unpaid} 
                    isHovered={isHovered}
                />
            </div>

            <div className="text-left font-bold text-gray-400 group-hover:text-gray-900 text-lg">
                <span className="text-gray-300 group-hover:text-black">Name: </span>
                <span className="group-hover:text-near-black">{category.categoryName}</span>
            </div>

            <div className="text-left font-bold text-gray-400 group-hover:text-gray-900 mt-2">
                <span className="text-gray-300 group-hover:text-black">Description: </span>
                <span className="group-hover:text-near-black">{category.description}</span>
            </div>

            <div className="text-left font-bold text-gray-400 group-hover:text-gray-900 mt-2">
                <span className="text-gray-300 group-hover:text-black">Created On: </span>
                <span className="group-hover:text-near-black">{formatDate(category.date)}</span>
            </div>
        </div>
    );
};

export default CategoryCard;