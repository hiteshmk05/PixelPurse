import { statsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoadingStats,setStats } from "../../redux/slices/statsSlice";

const{
    GET_STATS_API,
}=statsEndpoints;

export function getStatsFront(token){
    return async(dispatch)=>{
        dispatch(setLoadingStats(true));
        try {
            const headers={
				Authorization:`Bearer ${token}`
			};
            const response=await apiConnector("POST",GET_STATS_API,{},headers);
            console.log("PRINGTING STATS.......")
            console.log(response);
            const {categoryStats,totalPaidPercentage,totalUnpaidPercentage }=response.data;
            if(response.data.success){
                dispatch(setStats({
                    categoryStats,
                    totalPaidPercentage,
                    totalUnpaidPercentage,
                }));
            }
            

        } catch (error) {
            console.log("ERROR IN STATS....");
            console.log(error);
        }
        dispatch(setLoadingStats(false));
    };
};