import React from "react";
import Header from "../Header/header";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./userDashboard.css";
import { useLocation } from "react-router-dom";

function Payment(props) {
  let movieDetails = useLocation();
  return (
    <div>
      <Header />
      <div className="payment">
        <CheckCircleIcon className="successIcon" />
        <div className="margin-left">
          <h5>Payment successfull</h5>
          <span className="displayBlock">
            Movie: {movieDetails.state.movieName}
          </span>
          <span className="displayBlock">
            Theater: {movieDetails.state.theaterName}
          </span>
          <span>Location: {movieDetails.state.location}</span>
        </div>
      </div>
    </div>
  );
}
export default Payment;
