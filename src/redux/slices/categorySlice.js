import { createSlice } from "@reduxjs/toolkit";

const initialState={
    categories:[],
    loadingCategory:false,
};

const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategory:(state,action)=>{
            state.categories=action.payload;
        },
        pushCategory:(state,action)=>{
            state.categories.push(action.payload);
        },
        setLoadingCategory:(state,action)=>{
            state.loadingCategory=action.payload;
        },
    },
});

export const {setCategory,pushCategory,setLoadingCategory}=categorySlice.actions;
export default categorySlice.reducer;