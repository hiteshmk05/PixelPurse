import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import OtpInput from "react-otp-input";

const VerifyOTP = () => {
    const [otp, setOtp] = useState("");
    const { signupData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [signupData, navigate]);

    const changeHandler = (value) => {
        setOtp(value);
    };

    const submitHandlerOtp = (event) => {
        event.preventDefault();
        // console.log(otp.length);
        const { firstName, lastName, email, password, confirmPassword } = signupData;
        
        dispatch(signUp(firstName, lastName, email, password, confirmPassword, otp, navigate));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-6 pixelate pixelated-background">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg  text-center relative">
                <h2 className="text-2xl font-semibold mb-4 text-slate-300">Enter OTP</h2>
                
                <form onSubmit={submitHandlerOtp} className="space-y-4">
                    <OtpInput 
                        value={otp}
                        onChange={changeHandler}
                        numInputs={6}
                        renderSeparator={<span className="text-slate-300">-</span>}
                        renderInput={(props) => <input {...props} />}
                        shouldAutoFocus
                        inputStyle={{
                            width: "3rem",
                            height: "3rem",
                            margin: "0 0.5rem",
                            fontSize: "1.5rem",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            textAlign: "center",
                        }}
                    />

                    <button
                        type="submit"
                        className="w-full bg-button-color p-3 font-semibold 
                        text-black
                          rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300
                     ease-in-out border-2"
                        disabled={otp.length !== 6}
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOTP;
