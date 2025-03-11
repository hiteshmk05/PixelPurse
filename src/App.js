import React from 'react'
import Signup from './pages/Signup';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import NavBar from './components/common/NavBar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Error from './pages/Error';
import VerifyOTP from './pages/VerifyOTP';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';
import UserProfile from './components/core/sidebar/UserProfile';
import Charts from './components/core/sidebar/Charts';
import UserExpenses from './components/core/sidebar/UserExpenses';
import UserCategories from './components/core/sidebar/UserCategories';
import Footer from './components/common/Footer';
import SideBar from './components/core/dashboard/SideBar';
import { useSelector } from 'react-redux';
import AddCategoryExpense from './components/core/sidebar/AddCategoryExpense';
import "./App.css";
import DashboardContent from './components/core/dashboard/DashboardContent';

const App = () => {
    const location = useLocation();
    const isDashboard=location.pathname.startsWith("/dashboard");
    const isAuthRoute=location.pathname==="/login" || location.pathname=="/signup" 
                      || location.pathname==="/vertify-otp";

    const isDashboardPage = location.pathname.startsWith("/dashboard");

    const { token,loading } = useSelector((state) => state.auth);
  return (
    <div className="pixelpurse-title relative">        
        <NavBar/>

        {token !== null && isDashboardPage && <SideBar />}
        
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/contact-us' element={<ContactUs/>}/>
            <Route path='/about' element={<About/>} />
            <Route path='/privacy-policy' element={<About/>} />

            <Route path='/signup' element={
                <OpenRoute> <Signup /> </OpenRoute>
            } />
            <Route path='/login' element={
                <OpenRoute> <Login /> </OpenRoute>
            } />

			<Route path='/verify-otp' element={
                <OpenRoute> <VerifyOTP /> </OpenRoute>
            } />

            <Route path='/dashboard' element={ <PrivateRoute> <Dashboard /></PrivateRoute>}>
                {/* <Route index element={<Dashboard />} /> */}
                <Route path="/dashboard/expenses" element={<UserExpenses />} />
				<Route path="/dashboard/profile" element={<UserProfile />} />
                
                <Route path="/dashboard/categories" element={<UserCategories />} />
                <Route path="/dashboard/visualize" element={<Charts />} />
                <Route path="/dashboard/add-entry" element={<AddCategoryExpense/>} />
			</Route>

			<Route path="*" element={<Error />} />
        </Routes>

        { !isAuthRoute && !isDashboard && <Footer />}

    </div>
  )
};

export default App;