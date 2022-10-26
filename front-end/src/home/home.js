import React from "react";
import {useNavigate} from 'react-router-dom'
import './home.css';
import HomeHeader from "../Header/homeHeader";
function Home(props) {
    const navigate = useNavigate();
    return (
      <div>
        <HomeHeader/>

      <div className="Home">
          <button class = 'btn' id = 'user' onClick={() => navigate('/userHome')}>User</button>
        <button class='btn' id = 'admin' onClick={() => navigate('/adminHome')}>Admin</button>
    </div>
    </div>

    )
}

export default Home;