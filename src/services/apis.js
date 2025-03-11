const BASE_URL="http://localhost:5000/api/v1";

export const authEndpoints={
    SENDOTP_API: BASE_URL+"/auth/sendOTP",
    SIGNUP_API: BASE_URL+"/auth/signup",
    LOGIN_API: BASE_URL+"/auth/login",
    VERIFY_TOKEN_API: BASE_URL+"/auth/verify",
};
// updateNamePrice
export const expenseEndpoints = {
    GET_ALL_EXPENSES_API: BASE_URL+"/expense/getAllExpenses",
    ADD_EXPENSE_API: BASE_URL+"/expense/addExpense", 
    GET_FILTER_EXPENSES_API: BASE_URL+"/expense/getFilteredExpenses",
    UPDATE_NAME_PRICE_EXPENSE: BASE_URL + "/expense/updateNamePrice",
    UPDATE_EXPENSE_STATUS:BASE_URL+"/expense/updateExpenseStatus",

}

export const categoryEndpoints = {
    GET_ALL_CATEGORIES_API: BASE_URL+"/category/getAllCategories",
    ADD_CATEGORY_API: BASE_URL+"/category/addCategory",
}

export const statsEndpoints={
    GET_STATS_API:BASE_URL+"/stats/getStats",
}