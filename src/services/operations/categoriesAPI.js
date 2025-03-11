import { setCategory,pushCategory, setLoadingCategory } from "../../redux/slices/categorySlice";
import { apiConnector } from "../apiConnector";
import { categoryEndpoints } from "../apis";

const {
    GET_ALL_CATEGORIES_API,
    ADD_CATEGORY_API,
}=categoryEndpoints;

export function getAllCategories(token){
    return async(dispatch)=>{
        dispatch(setLoadingCategory(true));
        try {
            const headers={
                Authorization:`Bearer ${token}`
            };
            const response=await apiConnector("POST",GET_ALL_CATEGORIES_API,{},headers);
            console.log("GOT THE CATEGORIES........");
            console.log(response.data.categories);
            dispatch(setCategory(response.data.categories));
        } catch (error) {
            console.log(error);

        }
        dispatch(setLoadingCategory(false));
    };
};

export function addCategoryFrontend(token,categoryName,description){
    return async(dispatch)=>{
        try {
            const headers={
                Authorization: `Bearer ${token}`,
            };
            const response=await apiConnector("POST",ADD_CATEGORY_API,{
                categoryName,
                description,
            },headers);
            console.log(response.data);
            dispatch(pushCategory(response.data.category));
            // console.log("category pushed");
        } catch (error) {
            console.log(error);
        }
    };
};