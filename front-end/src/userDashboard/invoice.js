import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/header";
import Box from "@mui/material/Box";
import "./invoice.css";
function Invoice() {
  let movieDetails = useLocation();
  console.log(movieDetails);
  const [ticketsData, setTicketsData] = useState(
    movieDetails.state.state.ticketsData
  );
  const [moviesData, setMoviesData] = useState(
    movieDetails.state.state.moviedata
  );
  const [scheduleData, setScheduleData] = useState(
    movieDetails.state.state.scheduleData
  );
  //   display: grid;
  //     grid-template-columns: repeat(3, 1fr);
  return (
    <div>
      <Header></Header>
      <div className="form-middle">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <fieldset>
            <legend className="legendTitle">Invoice</legend>
            <span>
              <h3 className="payment">Payment succesfull!</h3>
            </span>
            <div className="ticket-grid">
              {ticketsData && ticketsData.length > 0
                ? ticketsData.map((ticket, index) => (
                    <div className="ticket-column" key={index}>
                      <p>Movie: {moviesData.movieName}</p>
                      <p>Theater: {moviesData.theaterName}</p>
                      <p>Location: {moviesData.location}</p>

                      <p>Seat Number{ticket.seatPosition}</p>
                      <p>Date:{scheduleData.date}</p>
                      <p>Time slot: {scheduleData.timeSlot}</p>
                    </div>
                  ))
                : ""}
            </div>
          </fieldset>
        </Box>
      </div>
    </div>
  );
}
export default Invoice;
