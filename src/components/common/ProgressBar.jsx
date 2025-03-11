import React from "react";
import { FaRegSmileBeam } from "react-icons/fa"; 

const ProgressBar = ({ paid, unpaid, isHovered }) => {
    const total = paid + unpaid;
    const paidPercentage = total === 0 ? 0 : (paid / total) * 100;
    const unpaidPercentage = 100 - paidPercentage;

    return (
        <div className="relative w-full">
            {isHovered && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md transition-opacity duration-300">
                    {total === 0 ? ( 
                        "No expenses here" // Show if no expenses
                    ) : unpaid === 0 ? ( 
                        <span className="flex items-center gap-2">
                            Relax <FaRegSmileBeam className="text-yellow-400" size={16} /> 
                           
                        </span> // Show smile & laugh emoji if no unpaid expenses
                    ) : (
                        `Paid: ${paid} | Unpaid: ${unpaid}` // Default display
                    )}
                </div>
            )}

            {/* Progress Bar Container */}
            <div className="w-full h-4 bg-gray-300 border border-gray-700 rounded-full overflow-hidden flex shadow-sm">
                {total > 0 && (
                    <>
                        {/* Paid (Green) Section */}
                        <div
                            className="h-full bg-green-500 transition-all duration-500 ease-in-out"
                            style={{
                                width: `${paidPercentage}%`,
                                borderTopLeftRadius: "999px",
                                borderBottomLeftRadius: "999px",
                            }}
                        ></div>

                        {/* Unpaid (Red) Section */}
                        <div
                            className="h-full bg-red-500 transition-all duration-500 ease-in-out"
                            style={{
                                width: `${unpaidPercentage}%`,
                                borderTopRightRadius: "999px",
                                borderBottomRightRadius: "999px",
                            }}
                        ></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProgressBar;

