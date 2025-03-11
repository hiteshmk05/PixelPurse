import { setExpense, setLoadingExpense, updateExpense, updateExpenseStatusSlice } from "../../redux/slices/expenseSlice";
import { apiConnector } from "../apiConnector";
import { expenseEndpoints } from "../apis";

const {
    GET_ALL_EXPENSES_API,
    ADD_EXPENSE_API,
    GET_FILTER_EXPENSES_API,
    UPDATE_NAME_PRICE_EXPENSE,
    UPDATE_EXPENSE_STATUS,
}=expenseEndpoints;

export function getAllExpenses(token){
    return async(dispatch) => {
        dispatch(setLoadingExpense(true));
        try{
            const headers={
                Authorization:`Bearer ${token}`
            };
            const response=await apiConnector("POST",GET_ALL_EXPENSES_API,{},headers);
            console.log("get all expenses response");
            console.log(response.data.expenses);
            dispatch(setExpense(response.data.expenses));

        }catch(error){
            console.log(error);
            
        }
        dispatch(setLoadingExpense(true));
    }
}

export function addExpenseFront(token,expenseName,price,categoryName,status){
    return async (dispatch)=>{
        try {
            const headers={
                Authorization:`Bearer ${token}`
            };

            const response=await apiConnector("POST",ADD_EXPENSE_API,{
                expenseName,
                price,
                categoryName,
                status,
            },headers);

            console.log(response.data);
        } catch (error) {
            console.log("error at frontend");
            console.log(error);
        }
    };
};


export function getFilteredExpenseFront(token,status,startDate,endDate){
    return async(dispatch)=>{
        dispatch(setLoadingExpense(true));
        try {
            const headers={
                Authorization:`Bearer ${token}`,
            };
            const queryParams = new URLSearchParams();

            if (status && status !== "all") {
                queryParams.append("status", status);
            }
            if (startDate) {
                queryParams.append("startDate", startDate);
            }
            if (endDate) {
                queryParams.append("endDate", endDate);
            }
            const response = await apiConnector(
                "GET",
                `${GET_FILTER_EXPENSES_API}?${queryParams.toString()}`, // Append query params to the URL
                {},
                headers
            );
            console.log(response.data);
            dispatch(setExpense(response.data.expenses));



        } catch (error) {
            console.log("error in expense api");
            console.log(error);
        }
        dispatch(setLoadingExpense(false));

    };
};


export function updateNamePriceFront(token,_id,expenseName,price){
    return async(dispatch)=>{
        dispatch(setLoadingExpense(true));
        try {
            const headers={
                Authorization:`Bearer ${token}`,
            };

            const response = await apiConnector("POST",UPDATE_NAME_PRICE_EXPENSE,{
                _id,
                newName:expenseName,
                newPrice:price,
            },headers);
            console.log(response.data);
            if(response.data.success){
                dispatch(updateExpense(response.data.updatedExpense));
            }

            
        } catch (error) {
            console.log(error);
        }
        dispatch(setLoadingExpense(false));
    }
}

export function updateExpenseStatusFront(token,_id,status){
    return async(dispatch)=>{
        dispatch(setLoadingExpense(true));
        try {
            const headers={
                Authorization:`Bearer ${token}`,
            };
            const response=await apiConnector("POST",UPDATE_EXPENSE_STATUS,{
                _id,
                status,
            },headers);

            console.log(response.data); 

            if(response.data.success){
                dispatch(updateExpenseStatusSlice(response.data.updatedExpense));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(setLoadingExpense(false));
    }
}