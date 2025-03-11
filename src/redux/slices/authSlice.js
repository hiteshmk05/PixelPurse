import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  	signupData: null,
  	loading: false,
	  token: localStorage.getItem("token") && localStorage.getItem("token")!=="undefined"  
		? JSON.parse(localStorage.getItem("token")) : null ,
    error:null,

};

const authSlice = createSlice({
	name: "auth",
  	initialState,
  	reducers: {
    	setSignupData: (state, action) => {
			state.signupData = action.payload;
    	},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", JSON.stringify(action.payload)); // Store token persistently
		},
		clearToken: (state) => {
			state.token = null;
			localStorage.removeItem("token"); // Remove token from storage
		},
		setError:(state,action)=>{
			state.error=action.payload;
		},
		clearError:(state)=>{
			state.error=null;
		},
	},
});

export const { setSignupData, setLoading, setToken
	,clearToken,setError,clearError} = authSlice.actions;

export default authSlice.reducer;
