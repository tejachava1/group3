import React from "react";
import {useNavigate} from 'react-router-dom'
import AdminHeader from '../Header/adminHeader';
import AddMovie from "./addMovie";

function AdminDashboard(props) {
    return(
        <div>
        <AddMovie/>
        </div>

    )
}
export default AdminDashboard;