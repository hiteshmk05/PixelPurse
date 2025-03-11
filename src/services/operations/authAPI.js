import { setLoading, setToken,clearToken, setError} from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { setUser } from "../../redux/slices/userSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  VERIFY_TOKEN_API,
} = authEndpoints

export function sendOtp(
	firstName,
	lastName,
	email,
	password,
	confirmPassword, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
          	checkUserPresent: true,
        });
        console.log("SENDOTP API RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        navigate("/verify-otp")
      } catch (error) {
        // console.log("SENDOTP API ERROR............", error);
		console.log("LOGIN API ERROR............", error);
			if (error.response) {
				console.log("Error Response Data:", error.response.data); 
				dispatch(setError(error.response.data.message || "OTP generation failed"));
			} else {
				dispatch(setError("An unexpected error occurred."));

			}

      }
      dispatch(setLoading(false))
    }
  }
  
export function signUp(
  	firstName,
  	lastName,
  	email,
  	password,
  	confirmPassword,
  	otp,
  	navigate
){
	return async (dispatch) => {
		dispatch(setLoading(true))
		try {
		const response = await apiConnector("POST", SIGNUP_API, {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			otp,
		})

		console.log("SIGNUP API RESPONSE............", response)

		if (!response.data.success) {
			throw new Error(response.data.message)
		}
		navigate("/login")
		} catch (error) {
			console.log("SIGNUP API ERROR............", error)
			navigate("/signup")
		}
		dispatch(setLoading(false))
	}
}

export function login(
	email,
	password,
	navigate
){
	return async(dispatch) => {
    	dispatch(setLoading(true));
		try {
			const response = await apiConnector("POST",LOGIN_API,{
				email,
				password,
			});

			if (!response.data.success) {
				console.log(response.data.error);
				throw new Error(response.data.message)
			}

			dispatch(setToken(response.data.token));
			dispatch(setUser(response.data.userExists));

			localStorage.setItem("token",JSON.stringify(response.data.token));
			localStorage.setItem("user",JSON.stringify(response.data.userExists));

			dispatch(setError(null));

			navigate("/dashboard");

		} catch (error) {
			console.log("LOGIN API ERROR............", error);
			if (error.response) {
				console.log("Error Response Data:", error.response.data); 
				dispatch(setError(error.response.data.message || "Login Failed"));
			} else {
				dispatch(setError("An unexpected error occurred."));

			}
		}
		dispatch(setLoading(false));
	}
};


export function logout(navigate){
	return (dispatch) => {
		dispatch(clearToken());
		dispatch(setUser(null));
		navigate("/");
	}

}

export function verifyToken(token){
	return async(dispatch)=>{
		try {
			const headers={
				Authorization:`Bearer ${token}`
			};
			const response=await apiConnector("GET",VERIFY_TOKEN_API,{},headers);

			if (response.data.success) {
				dispatch(setToken(response.data.token)); // Update token if needed
			} else {
				dispatch(clearToken());
			}
		} catch (error) {
			console.log(error);
			dispatch(clearToken());
		}
		
	
	};
} 