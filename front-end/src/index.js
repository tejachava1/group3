import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminSignup from "./adminSignup/adminSignup";
import AdminLogin from "./adminLogin/adminLogin";
import UserLogin from "./userLogin/userLogin";
import UserSignup from "./userSignup/userSignup";
import AdminHome from "./adminHome/adminHome";
import UserHome from "./userHome/userHome";
import UserDashboard from "./userDashboard/userDashboard";
import AdminDashboard from "./adminDashboard/adminDashboard";
import AddMovie from "./adminDashboard/addMovie";
import AddTheater from "./adminDashboard/addTheater";
import AddSchedule from "./adminDashboard/addSchedule";
import Movie from "./adminDashboard/Movie";
import Theater from "./adminDashboard/Theater";
import Schedule from "./adminDashboard/Schedule";
import Payment from "./userDashboard/payment";
import SeatBooking from "./userDashboard/seat";
import MyBookings from "./userDashboard/myBookings";
import Invoice from "./userDashboard/invoice";

import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/userSignup" element={<UserSignup />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/userHome" element={<UserHome />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/addTheater" element={<AddTheater />} />
        <Route path="/addSchedule" element={<AddSchedule />} />
        <Route path="/Movies" element={<Movie />} />
        <Route path="/Theaters" element={<Theater />} />
        <Route path="/Schedules" element={<Schedule />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Seatbooking" element={<SeatBooking />} />
        <Route path="/Mybooking" element={<MyBookings />} />
        <Route path="/Invoice" element={<Invoice />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
