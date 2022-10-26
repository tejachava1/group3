import React from "react";
import './userHome.css';
import {useNavigate} from 'react-router-dom';
import HomeHeader from "../Header/homeHeader";

function UserHome() {
    const navigate = useNavigate();

    return (
    <div>
        <HomeHeader/>

      <div className="userHome">
           <button class = 'btn' id = 'signin' onClick={() => navigate('/userLogin')}>Sign In</button>
        <button class='btn' id = 'signup' onClick={() => navigate('/userSignup')}>Sign Up</button>
    </div>
    </div>

    )
}

export default UserHome;