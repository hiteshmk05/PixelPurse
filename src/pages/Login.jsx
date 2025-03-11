import React, { useState } from 'react';
import login_img from '../assets/images/login_img.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/operations/authAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loading from '../components/common/Loading';
import { setError } from '../redux/slices/authSlice';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {loading,error}=useSelector((state)=>state.auth);

    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const { email, password } = formData;
    const {token}=useSelector((state)=>state.auth);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password, navigate));
    };
    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    return (
        <div className="pixelate pixelated-background relative min-h-screen flex flex-col 
        items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-6">

            {loading ? (<Loading/>) : 
            (
            <div className="flex flex-col items-center bg-black bg-opacity-70 backdrop-blur-lg 
            p-8 rounded-xl shadow-2xl w-full max-w-3xl border border-white border-opacity-20">
                
                <h1 className="text-3xl font-bold text-white mb-4 text-center">Welcome Back!</h1>

                <p className="text-gray-300 text-center mb-6">
                    Log in to track your expenses and manage your finances effortlessly.
                </p>

                <div className="flex flex-col items-center w-full">
                    <img src={login_img} alt="Login" className="w-40 h-40 rounded-full mb-6" />
                </div>

                <form onSubmit={submitHandler} className="w-full flex flex-col space-y-4">
                    <input 
                        type="text" 
                        name="email" 
                        value={formData.email} 
                        onChange={(e) => {
                            changeHandler(e);
                            setError(null); 
                        }} 
                        placeholder="Email"
                        className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 
                        focus:ring-[#8C7AE6] border ${error && !formData.email ? "border-red-500" 
                        : "border-gray-600"} 
                        placeholder-gray-400`} 
                    />
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={formData.password} 
                            onChange={(e) => {
                                changeHandler(e);
                                setError(null); 
                            }} 
                            placeholder="Password"
                            className={`w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 
                            focus:ring-[#8C7AE6] border ${error && !formData.password ? "border-red-500" 
                            : "border-gray-600"} 
                            placeholder-gray-400`} 
                        />
                        <span className="absolute inset-y-0 right-4 flex items-center cursor-pointer" 
                        onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash className="text-gray-400" /> : 
                        <FaEye className="text-gray-400" />}
                        </span>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#8C7AE6] hover:bg-[#B89EFF] text-white text-lg font-semibold 
                        rounded-lg px-6 py-3 shadow-lg transition-all duration-300">
                        Log In
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                    )}
                </form>
            
            </div>
        )}
    
        </div>

    );
};

export default Login;
