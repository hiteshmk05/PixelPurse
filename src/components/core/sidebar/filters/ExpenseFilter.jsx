import React, { useState } from 'react';

const ExpenseFilter = ({onFilter}) => {
    const [status,setStatus]=useState("all");
    const [startDate,setStartDate]=useState("");
    const [endDate,setEndDate]=useState("");

    const submitFilterHandler=(event)=>{
        event.preventDefault();
        onFilter({status,startDate,endDate});
    }

    return (
        <div className="w-full max-w-4xl p-5 bg-[#29303a] rounded-lg shadow-lg mb-6">
            <form onSubmit={submitFilterHandler} className="space-y-4">
                {/* Status, Start Date, End Date Filters in the same line */}
                <div className="flex space-x-4">
                    {/* Status Filter */}
                    <div className="w-1/4">
                        <label className="text-gray-300 text-lg font-semibold" htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="mt-2 p-2 w-full rounded-md bg-slate-200 text-gray-900 focus:outline-none h-12"
                        >
                            <option value="all">All</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>
    
                    {/* Start Date Filter */}
                    <div className="w-1/4">
                        <label className="text-gray-300 text-lg font-semibold" htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="mt-2 p-2 w-full rounded-md bg-slate-200 text-gray-900 focus:outline-none h-12"
                        />
                    </div>
    
                    {/* End Date Filter */}
                    <div className="w-1/4">
                        <label className="text-gray-300 text-lg font-semibold" htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="mt-2 p-2 w-full rounded-md bg-slate-200 text-gray-900 focus:outline-none h-12"
                        />
                    </div>
    
                    {/* Apply Filter Button */}
                    <div className="flex justify-center items-end w-1/4">
                        <button
                            type="submit"
                            className="mt-2 px-6 py-3 bg-slate-200 hover:bg-[#B89EFF] text-gray-900 rounded-md font-semibold transition-all duration-300 w-full h-12"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
    
    
};

export default ExpenseFilter;