import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";

import Header from "../Header/header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
function MyBookings(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [tickets, setTickets] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [newTickets, setNewTickets] = useState([]);
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    console.log(JSON.parse(localStorage.getItem("userData")));
    axios
      .get("http://localhost:3001/schedules")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {});
    axios
      .get("http://localhost:3001/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {});
    axios
      .get("http://localhost:3001/theaters")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    if (tickets.length > 0) {
      getNewTickets(movies, theaters, schedules);
      console.log(newTickets);
    }
  }, [tickets]);

  const getNewTickets = (movies, theaters, schedules) => {
    for (var i = 0; i <= tickets.length - 1; i++) {
      for (var j = 0; j <= tickets.length - 1; j++) {
        if (tickets[i].scheduleId === schedules[j]?._id) {
          for (var k = 0; k < tickets.length - 1; k++) {
            if (movies[k]?._id === schedules[j].movieId) {
              tickets[i].movieName = movies[k].movieName;
            }
          }
          for (var l = 0; l < tickets.length - 1; l++) {
            if (theaters[l]?._id === schedules[j].theaterId) {
              tickets[i].theaterName = theaters[l].theaterName;
              tickets[i].theaterLocation = theaters[l].theaterLocation;
            }
          }
        }
        console.log(tickets);
      }
      setNewTickets(tickets);
    }
  };

  useEffect(() => {
    if (movies && theaters && schedules) {
    }
  }, [movies && theaters && schedules]);
  useEffect(() => {
    debugger;
    if (userData !== null && userData !== {} && userData._id) {
      axios
        .get(`http://localhost:3001/ticket/${userData._id}`)
        .then((response) => {
          setTickets(response.data);
        });
    }
  }, [userData]);

  return (
    <div>
      <Header></Header>
      <div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {newTickets.map((data, i) => (
            <Grid item xs={3} key={i}>
              <Card>
                <CardContent>
                  <p>Movie: {data.movieName}</p>
                  <p>Theater: {data.theaterName}</p>
                  <p>Location: {data.theaterLocation}</p>
                  <p>Seat Number: {data.seatNumber}</p>
                  <p>Status:{data.status}</p>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* {newTickets.map((data, i) => (
          <Card key={i}>
            <CardContent>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                
              </Grid>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
export default MyBookings;
