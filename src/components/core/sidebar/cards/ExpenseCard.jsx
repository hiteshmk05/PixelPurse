// import React from 'react';
// import { formatDate } from '../../../../services/dateFormatter';
// import { FaEdit } from 'react-icons/fa';

// const ExpenseCard = ({ expense }) => {
//     return (
//         <div className="w-full max-w-sm p-5 bg-[#29303a] group hover:bg-slate-200 
//             shadow-md rounded-lg transition-all duration-300 ease-in-out 
//             transform hover:scale-105 hover:shadow-lg h-auto flex flex-col justify-between">

//             <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
//                 <span className=" text-gray-300 group-hover:text-black">Name: </span>
//                 <span className="group-hover:text-near-black">{expense.expenseName}</span>
//             </div>

//             <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
//                 <span className=" text-gray-300 group-hover:text-black">Category: </span>
//                 <span className="group-hover:text-near-black">{expense.category.categoryName}</span>
//             </div>

//             <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
//                 <span className="font-bold text-gray-300 group-hover:text-black">Price: </span>
//                 <span className="group-hover:text-near-black">${expense.price}</span>
//             </div>

//             <div className="flex justify-start mt-2">
//                 <span className={`px-3 py-1 rounded-full text-white font-semibold
//                     ${expense.status.toLowerCase() === "paid" ? "bg-green-500" : "bg-red-500"}`}>
//                     {expense.status}
//                 </span>
//             </div>

//             <div className="flex justify-between font-bold items-center mt-4">
//                 <div className="text-left text-gray-400 group-hover:text-gray-900">
//                     <span className="font-bold text-gray-300 group-hover:text-black">Created On: </span>
//                     <span className="group-hover:text-near-black">{formatDate(expense.date)}</span>
//                 </div>
//                 <button className="text-blue-500 hover:text-blue-700">
//                     <FaEdit size={20} />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ExpenseCard;

// import React, { useState } from 'react';
// import { formatDate } from '../../../../services/dateFormatter';
// import { FaEdit, FaCheck } from 'react-icons/fa';

// const ExpenseCard = ({ expense }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedName, setEditedName] = useState(expense.expenseName);
//     const [editedPrice, setEditedPrice] = useState(expense.price);

//     // Toggle edit mode
//     const toggleEdit = () => setIsEditing(!isEditing);

//     return (
//         <div className="w-full max-w-sm p-5 bg-[#29303a] group hover:bg-slate-200 
//             shadow-md rounded-lg transition-all duration-300 ease-in-out 
//             transform hover:scale-105 hover:shadow-lg h-auto flex flex-col justify-between">

//             {/* Expense Name - Editable */}
//             <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
//                 <span className="text-gray-300 group-hover:text-black">Name: </span>
//                 {isEditing ? (
//                     <input
//                         type="text"
//                         value={editedName}
//                         onChange={(e) => setEditedName(e.target.value)}
//                         className="px-2 py-1 border border-gray-400 rounded bg-white text-black w-full"
//                     />
//                 ) : (
//                     <span className="group-hover:text-near-black">{editedName}</span>
//                 )}
//             </div>

//             {/* Expense Category (Not Editable) */}
//             <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
//                 <span className="text-gray-300 group-hover:text-black">Category: </span>
//                 <span className="group-hover:text-near-black">{expense.category.categoryName}</span>
//             </div>

//             {/* Expense Price - Editable */}
            // <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
            //     <span className="font-bold text-gray-300 group-hover:text-black">Price: </span>
            //     {isEditing ? (
            //         <input
            //             type="number"
            //             value={editedPrice}
            //             onChange={(e) => setEditedPrice(e.target.value)}
            //             className="px-2 py-1 border border-gray-400 rounded bg-white text-black w-full"
            //         />
            //     ) : (
            //         <span className="group-hover:text-near-black">${editedPrice}</span>
            //     )}
            // </div>

//             {/* Status Badge */}
//             <div className="flex justify-start mt-2">
//                 <span className={`px-3 py-1 rounded-full text-white font-semibold
//                     ${expense.status.toLowerCase() === "paid" ? "bg-green-500" : "bg-red-500"}`}>
//                     {expense.status}
//                 </span>
//             </div>

//             {/* Created Date + Edit Button */}
//             <div className="flex justify-between font-bold items-center mt-4">
//                 <div className="text-left text-gray-400 group-hover:text-gray-900">
//                     <span className="font-bold text-gray-300 group-hover:text-black">Created On: </span>
//                     <span className="group-hover:text-near-black">{formatDate(expense.date)}</span>
//                 </div>

//                 {/* Edit / Save Button */}
//                 <button onClick={toggleEdit} className="text-blue-500 hover:text-blue-700">
//                     {isEditing ? <FaCheck size={20} /> : <FaEdit size={20} />}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ExpenseCard;

import React, { useDebugValue } from 'react';
import { formatDate } from '../../../../services/dateFormatter';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpenseStatusFront, updateNamePriceFront } from '../../../../services/operations/expensesAPI';
import { TbXboxXFilled } from "react-icons/tb";
import { updateExpenseStatusSlice } from '../../../../redux/slices/expenseSlice';

const ExpenseCard = ({ expense }) => {
    const dispatch=useDispatch();
    const [isEditing,setIsEditing]=useState(false);
    const [newExpenseData,setNewExpenseData]=useState({
        expenseName:expense.expenseName,
        price:expense.price,
    });
    const {token}=useSelector((state)=>state.auth);

    const editHandler=(event)=>{
        setNewExpenseData((prevData)=>({
            ...prevData,
            [event.target.name]:event.target.value
        }));
    };

    const editExpenseSubmitHandler=(event)=>{
        event.preventDefault();
        dispatch(updateNamePriceFront(token,expense._id,newExpenseData.expenseName,newExpenseData.price));
        setIsEditing(false);
    }

    const changeStatusHandler=(event)=>{
        event.preventDefault();
        // console.log("but");
        const status = expense.status.toLowerCase() === "paid" ? "unpaid" : "paid";
        dispatch(updateExpenseStatusFront(token,expense._id,status));

    }

    return (
        <div className="w-full max-w-sm p-5 bg-[#29303a] group hover:bg-slate-200 
            shadow-md rounded-lg transition-all duration-300 ease-in-out 
            transform hover:scale-105 hover:shadow-lg h-auto flex flex-col justify-between">
                {isEditing ? 
                (<form onSubmit={editExpenseSubmitHandler}>
                    <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
                        <span className="text-gray-300 group-hover:text-black">Name: </span>
                        <input
                            type="text"
                            name="expenseName"
                            value={newExpenseData.expenseName}
                            onChange={editHandler}
                            className="px-2 py-1 border border-gray-400 rounded bg-white text-black w-full"
                        />
                    </div>

                    <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
                        <span className="font-bold text-gray-300 group-hover:text-black">Price: </span>
                        <input
                            type="number"
                            name="price"
                            value={newExpenseData.price}
                            onChange={editHandler}
                            className="px-2 py-1 border border-gray-400 rounded bg-white text-black w-full"
                        />
                    </div>

                    <div className="flex justify-between font-bold items-center mt-4">
                        <button type="button" onClick={()=>setIsEditing(false)} >
                            <TbXboxXFilled className="text-red-500 hover:text-red-700" />
                        </button>
                        <button type='submit' className="text-blue-500 hover:text-blue-700">
                            <FaCheck size={20} />
                        </button>
                    </div>
                </form>) : 
                (<>
                    <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
                        <span className=" text-gray-300 group-hover:text-black">Name: </span>
                        <span className="group-hover:text-near-black">{expense.expenseName}</span>
                    </div>

                    <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
                        <span className=" text-gray-300 group-hover:text-black">Category: </span>
                        <span className="group-hover:text-near-black">{expense.category.categoryName}</span>
                    </div>

                    <div className="text-left font-bold text-gray-400 group-hover:text-gray-900">
                        <span className="font-bold text-gray-300 group-hover:text-black">Price: </span>
                        <span className="group-hover:text-near-black">${expense.price}</span>
                    </div>

                    <div className="flex justify-start mt-2">
                        <form onSubmit={changeStatusHandler} >
                            <button type="submit" className={`px-3 py-1 rounded-full text-white font-semibold
                                ${expense.status.toLowerCase() === "paid" ? "bg-green-500" : "bg-red-500"}`}>
                                {expense.status}
                            </button>
                        </form>
                    </div>

                    <div className="flex justify-between font-bold items-center mt-4">
                        <div className="text-left text-gray-400 group-hover:text-gray-900">
                            <span className="font-bold text-gray-300 group-hover:text-black">Created On: </span>
                            <span className="group-hover:text-near-black">{formatDate(expense.date)}</span>
                        </div>
                        <button onClick={()=>setIsEditing(true)} className="text-blue-500 hover:text-blue-700">
                            <FaEdit size={20} />
                        </button>
                    </div>
                </>)
                }
            
        </div>
    );
};

export default ExpenseCard;