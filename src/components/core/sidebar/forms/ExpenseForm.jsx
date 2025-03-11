import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseFront } from '../../../../services/operations/expensesAPI';
import { getAllCategories } from '../../../../services/operations/categoriesAPI';

const ExpenseForm = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [categoryChoices, setCategoryChoices] = useState([]);
    const [expenseData, setExpenseData] = useState({
        expenseName: "",
        price: 0,
        categoryName: "",
        status: "",
    });

    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        setCategoryChoices(categories);
    }, [categories]);

    const changeHandler = (event) => {
        setExpenseData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

    const expenseSubmitHandler = (event) => {
        event.preventDefault();

        if (!expenseData.expenseName || !expenseData.price || expenseData.price < 0 || !expenseData.categoryName 
            || !expenseData.status) {
            console.log("Not enough information provided");
            return;
        }

        dispatch(addExpenseFront(token, expenseData.expenseName, expenseData.price, 
            expenseData.categoryName, expenseData.status));
        setExpenseData({
            expenseName: "",
            price: 0,
            categoryName: "",
            status: "",
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            expenseSubmitHandler(event);
        }
    };
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto unpixelated">
            <h3 className="text-xl font-semibold text-white mb-4">Add a New Expense Entry</h3>
            <form onSubmit={expenseSubmitHandler} className="space-y-4 w-full">
    <div className="flex flex-row w-full gap-4 ">
        <div className="flex flex-col w-1/2 min-w-0 ">
            <label htmlFor="expenseName" className="text-gray-300">Expense Name</label>
            <input
                type="text"
                name="expenseName"
                id="expenseName"
                value={expenseData.expenseName}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                placeholder="Expense Name"
                className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2
                 focus:ring-indigo-500 bg-white text-gray-800"
            />
        </div>
        <div className="flex flex-col w-1/2">
            <label htmlFor="price" className="text-gray-300">Price</label>
            <input
                type="number"
                name="price"
                id="price"
                value={expenseData.price}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                placeholder="Price"
                className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2
                 focus:ring-indigo-500 bg-white text-gray-800"
            />
        </div>
    </div>
    
    <div className="flex flex-row w-full gap-4">
        <div className="flex flex-col w-1/2">
            <label htmlFor="categoryName" className="text-gray-300">Category</label>
            <select
                name="categoryName"
                value={expenseData.categoryName}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2
                 focus:ring-indigo-500 bg-white text-gray-800"
            >
                <option value="" disabled>Select a category</option>
                {categoryChoices.map((category) => (
                    <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
                ))}
            </select>
        </div>
        <div className="flex flex-col w-1/2 ">
            <label htmlFor="status" className="text-gray-300">Status</label>
            <select
                name="status"
                value={expenseData.status}
                onChange={changeHandler}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2
                 focus:ring-indigo-500 bg-white text-gray-800"
            >
                <option value="" disabled>Select status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
            </select>
        </div>
    </div>

    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md
     hover:bg-indigo-700 transition">Submit Expense</button>
</form>
        </div>
    );
    
};

export default ExpenseForm;
