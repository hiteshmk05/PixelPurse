import React, { useState } from 'react';
import signup_img from '../assets/images/signup_img.jpeg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../redux/slices/authSlice';
import { sendOtp } from '../services/operations/authAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loading from '../components/common/Loading';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const {loading}=useSelector((state)=>state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const signupData = { ...formData };
        dispatch(setSignupData(signupData));
        console.log("sign updata set");
        dispatch(sendOtp(signupData.firstName,signupData.lastName,signupData.email,
            signupData.password,signupData.confirmPassword, navigate));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="pixelate pixelated-background relative min-h-screen flex flex-col 
        items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-6">
            {loading ? (<Loading/>):(
                <div className="flex flex-col items-center bg-black bg-opacity-70 backdrop-blur-lg 
                p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-white border-opacity-20">
                    <h1 className="text-3xl font-bold text-white mb-4 text-center">Join Pixel Purse for Free!</h1>
                    <p className="text-gray-300 text-center mb-6">Track your expenses effortlessly with our powerful tool.</p>
    
                    <div className="flex flex-col items-center w-full">
                        <img src={signup_img} alt="Signup" className="w-40 h-40 rounded-full mb-6" />
                    </div>
    
                    <form onSubmit={submitHandler} className="w-full flex flex-col space-y-4">
                        <div className="flex space-x-4">
                            <input type="text" name="firstName" value={formData.firstName} 
                            onChange={changeHandler}  placeholder="First Name"
                                className={`w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 
                                focus:ring-[#8C7AE6] border
                                 ${error && !formData.firstName ? "border-red-500" : "border-gray-600"} 
                                placeholder-gray-400`} />
                            
                            <input type="text" name="lastName" value={formData.lastName} 
                            onChange={changeHandler}  placeholder="Last Name"
                                className={`w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 
                                focus:ring-[#8C7AE6] border
                                 ${error && !formData.lastName ? "border-red-500" : "border-gray-600"} 
                                placeholder-gray-400`} />
                        </div>
    
                        <input type="text" name="email" value={formData.email} 
                        onChange={changeHandler}  placeholder="Email"
                            className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2
                            focus:ring-[#8C7AE6] border
                             ${error && !formData.email ? "border-red-500" : "border-gray-600"} 
                            placeholder-gray-400`} />
                        
                        <div className="flex space-x-4 relative">
                            <div className="relative w-1/2">
                                <input type={showPassword ? "text" : "password"} name="password" 
                                value={formData.password} onChange={changeHandler}  placeholder="Password"
                                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg 
                                    focus:ring-2 focus:ring-[#8C7AE6] border 
                                    ${error && !formData.password ? "border-red-500" : "border-gray-600"} 
                                    placeholder-gray-400`} />
                                <span className="absolute inset-y-0 right-4 flex items-center
                                cursor-pointer" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash className="text-gray-400" /> : 
                                    <FaEye className="text-gray-400" />}
                                </span>
                            </div>
                            <div className="relative w-1/2">
                                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                                value={formData.confirmPassword} onChange={changeHandler}
                                 placeholder="Confirm Password"
                                    className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg 
                                    focus:ring-2 focus:ring-[#8C7AE6] border 
                                    ${error && !formData.confirmPassword ? "border-red-500" : "border-gray-600"} 
                                    placeholder-gray-400`} />
                                <span className="absolute inset-y-0 right-4 flex items-center 
                                cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> :
                                    <FaEye className="text-gray-400" />}
                                </span>
                            </div>
                        </div>
    
                        {error && (
                            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                        )}
    
                        <button type='submit' className="w-full bg-[#8C7AE6] 
                        hover:bg-[#B89EFF] text-white text-lg font-semibold 
                        rounded-lg px-6 py-3 shadow-lg transition-all duration-300">
                            Sign Up
                        </button>
                    </form>
                </div>
            ) }
        </div>
    );
};

export default Signup;
