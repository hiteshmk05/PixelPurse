import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFilteredExpenseFront } from '../../../services/operations/expensesAPI';
import ExpenseCard from './cards/ExpenseCard';
import ExpenseFilter from './filters/ExpenseFilter';
import Loading from '../../common/Loading';
const UserExpenses = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { expenses } = useSelector((state) => state.expense);
    const [filterParams,setFilterParams]=useState({
        status: "all",
        startDate: "",
        endDate: "",
    });

    const {loadingExpense}=useSelector((state)=>state.expense);

    useEffect(() => {
        dispatch(getFilteredExpenseFront(token,filterParams.status,filterParams.startDate,filterParams.endDate));
    }, [filterParams]);

    

    const handleFilterChange=(newFilter)=>{
        setFilterParams(newFilter);
    }

    return (
        <div>
            {loadingExpense ? <Loading/> :(<>
                <div className="mb-6 relative"> {/* Added margin-bottom for spacing */}
                <ExpenseFilter onFilter={handleFilterChange} />
            </div>
            <div className="mx-auto p-6 relative bg-gray-800 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-min place-items-start">
                    {expenses.map((expense) => (
                    <ExpenseCard key={expense._id} expense={expense} />
                    ))}
                </div>
            </div>
            </>) }
        </div>
    );
};

export default UserExpenses;
