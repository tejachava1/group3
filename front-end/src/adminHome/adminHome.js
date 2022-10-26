import React from "react";
import './adminHome.css';
import {useNavigate} from 'react-router-dom'
import HomeHeader from "../Header/homeHeader";
function AdminHome() {
    const navigate = useNavigate();

    return (
    <div>
        <HomeHeader/>

      <div className="adminHome">
         <button class = 'btn' id = 'signin' onClick={() => navigate('/adminLogin')}>Sign In</button>
        <button class='btn' id = 'signup' onClick={() => navigate('/adminSignup')}>Sign Up</button>
    </div>
    </div>

    )
}

export default AdminHome;