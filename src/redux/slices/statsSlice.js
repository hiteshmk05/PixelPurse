import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loadingStats:false,
    categoryStats:[],
    totalPaidPercentage:0,
    totalUnpaidPercentage:0,
}

const statsSlice=createSlice({
    name:"stats",
    initialState,
    reducers:{
        setStats:(state,action)=>{
            const {categoryStats,totalPaidPercentage,totalUnpaidPercentage}=action.payload;
            state.categoryStats=categoryStats;
            state.totalUnpaidPercentage=totalUnpaidPercentage;
            state.totalPaidPercentage=totalPaidPercentage;
        },

        setLoadingStats:(state,action)=>{
            state.loadingStats=action.payload;
        },
    },
})

export const {setStats,setLoadingStats}=statsSlice.actions;
export default statsSlice.reducer;