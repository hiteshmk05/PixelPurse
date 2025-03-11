import React from 'react';
import CategoryForm from './forms/CategoryForm';
import ExpenseForm from './forms/ExpenseForm';

const AddCategoryExpense = () => {
    return (
        <div className="flex space-x-8 p-8 items-center">
            <div className="w-1/2">
                <CategoryForm />
            </div>
            <div className="w-1/2">
                <ExpenseForm />
            </div>
        </div>
    );
};

export default AddCategoryExpense;
