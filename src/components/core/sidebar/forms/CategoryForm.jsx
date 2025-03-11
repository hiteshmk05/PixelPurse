import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryFrontend } from '../../../../services/operations/categoriesAPI';

const CategoryForm = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [categoryData, setCategoryData] = useState({
        categoryName: "",
        description: "",
    });

    const categorySubmitHandler = (event) => {
        event.preventDefault();

        if (!categoryData.categoryName) {
            console.log("Add category name");
            return;
        }

        dispatch(addCategoryFrontend(token, categoryData.categoryName, categoryData.description));
        setCategoryData({
            categoryName: "",
            description: "",
        });
    };

    const categoryChangeHandler = (event) => {
        setCategoryData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            categorySubmitHandler(event);
        }
    };

    return (
        <div className="bg-gray-800  p-6 rounded-lg shadow-lg max-w-lg mx-auto unpixelated">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Add a New Category</h3>
            <form onSubmit={categorySubmitHandler} className="space-y-4 w-full">
                <div className="flex flex-col ">
                    <label htmlFor="categoryName" className="text-gray-300">Category Name</label>
                    <input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        value={categoryData.categoryName}
                        onChange={categoryChangeHandler}
                        onKeyDown={handleKeyDown}
                        required
                        placeholder='Category Name'
                        className="p-2 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2
                         focus:ring-indigo-500  bg-white text-gray-800"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="text-gray-300">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder='Description'
                        value={categoryData.description}
                        onChange={categoryChangeHandler}
                        onKeyDown={handleKeyDown}
                        required
                        className="p-2 border border-gray-300 rounded-md mt-2 focus:outline-none 
                        focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2
                 rounded-md hover:bg-indigo-700 transition">Add Category</button>
            </form>
        </div>
    );
};

export default CategoryForm;
