import { createSlice } from "@reduxjs/toolkit";

const initialState={
    expenses:[],
    loadingExpense:false,
};

const expenseSlice=createSlice({
    name:"expense",
    initialState,
    reducers:{
        setExpense:(state,action)=>{
            state.expenses=action.payload;
        },
        setLoadingExpense:(state,action)=>{
            state.loadingExpense=action.payload;
        },
        updateExpense:(state,action)=>{
            const updatedExpense=action.payload;
            const expenseIndex=state.expenses.findIndex(
                (expense)=>expense._id===updatedExpense._id
            );

            if(expenseIndex!=-1){
                state.expenses[expenseIndex].expenseName=updatedExpense.expenseName;
                state.expenses[expenseIndex].price=updatedExpense.price;
            }
        },
        updateExpenseStatusSlice:(state,action)=>{
            const updatedExpense=action.payload;
            const expenseIndex=state.expenses.findIndex(
                (expense)=>expense._id===updatedExpense._id
            );
            if(expenseIndex!=-1){
                state.expenses[expenseIndex].status=updatedExpense.status;
                // state.expenses[expenseIndex].price=updatedExpense.price;
            }
        }
    }
});

export const {setExpense,setLoadingExpense,updateExpense,updateExpenseStatusSlice}=expenseSlice.actions;
export default expenseSlice.reducer;