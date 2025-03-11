import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"; // Example: auth slice
import categoryReducer from "../slices/categorySlice"; // Example: category slice
import userReducer from "../slices/userSlice";
import expenseReducer from "../slices/expenseSlice";
import statsReducer from "../slices/statsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer, // Example: categories reducer
    user:userReducer,
    expense:expenseReducer,
    category:categoryReducer,
    stats:statsReducer,
});

export default rootReducer;
