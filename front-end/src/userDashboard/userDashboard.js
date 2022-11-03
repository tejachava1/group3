import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import moment from "moment";
import { useId } from "react";

function UserDashboard(props) {
  const navigate = useNavigate();
  const userData = useLocation();
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [movieSchedules, setMovieSchedules] = useState([]);
  const [calPrice, setCalPrice] = useState(0);
  const [theaters, setTheaters] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState("top");
  const [horizontal, setHorizontal] = React.useState("right");
  const [scheduleTime, setScheduleTime] = useState({});
  const [timeSlot, setTimeSlot] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [seatsSelected, setSeatsSelected] = useState(0);
  const [theater, setTheater] = useState({});
  const [user_id, setUser_id] = useState('');
  const [userName, setUserName] = useState("");
  const [currentBookedTickets, setCurrentBookedTickets] = useState([]);
  // useEffect(() => {

  //   if (userData.state !== null) {
  //     setUser_id(userData.state._id);
  //     setUserName(userData.state.name);
  //     localStorage.setItem("userData", JSON.stringify(userData.state));
  //   }
  // }, [userData]);
  useEffect(() => {
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
      let userData = JSON.parse(localStorage.getItem("userData"));
      setUser_id(userData._id);
      setUserName(userData.name);

  }, []);

  const handleInputChange = (e) => {
    setSeatsSelected(e.target.value);
    let price = theater.pricePerSeat * e.target.value;
    setCalPrice(price);
  };

  const handleCancel = (event) => {};

  let moviedata = {
    movieName: movie.movieName,
    theaterName: theater.theaterName,
    location: theater.theaterLocation,
  };
  let seats = +seatsSelected;
  let theaterData = {
    theaterLocation: theater.theaterLocation,
    theaterName: theater.theaterName,
    numberOfSeats: theater.numberOfSeats -seats,
    pricePerSeat: theater.pricePerSeat,
    ticketsBooked: theater.ticketsBooked + seats,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let ticketsData = [];
    let ticketsResponse = [];
    let seats = +seatsSelected;
    if (seats >= 1) {
      for (var i = 0; i < seats; i++) {
        let data = {
          scheduleId: scheduleTime._id,
          price: calPrice,
          noOfSeats: +seatsSelected,
          userId: user_id,
          seatNumber: theater.ticketsBooked + i + 1,
          status: "confirmed",
        };
        ticketsData.push(data);
      }
    }
    if (ticketsData.length > 0) {
      // for (var i = 0; i < ticketsData.length; i++) {
      //   axios
      //     .post("http://localhost:3001/ticket", ticketsData[i])
      //     .then((response) => {
      //       if (response.status == 201) {
      //         ticketsResponse.push(response.data);
      //         // navigate("/Payment", { state: moviedata });
      //       }
      //     })
      //     .catch((error) => {
      //       handleClickError();
      //     });
      // }
      // axios
      //   .put(`http://localhost:3001/theaters/${theater._id}`, theaterData)
      //   .then((response) => {
          navigate("/Payment", { state: ticketsData });
        // });
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClickError = () => {
    setErrorOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChangeMovie = (event) => {
    setMovie(event.target.value);
  };
  const handleChangeTheater = (event) => {
    setTheater(event.target.value);
  };
  let moviesselctions = null;
  useEffect(() => {
    if (movie && theater) {
      let movieSchedule = [];
      let timeSlots = [];
      for (var i = 0; i <= schedules.length; i++) {
        if (
          movie._id === schedules[i]?.movieId &&
          theater._id === schedules[i]?.theaterId
        ) {
          movieSchedule.push(schedules[i]);
        }
      }
      setMovieSchedules(movieSchedule);
    }
  }, [movie && theater]);

  useEffect(() => {
    if (movie && theater && scheduleTime) {
      let timeSlots = [];
      for (var i = 0; i <= schedules.length; i++) {
        if (
          movie._id === schedules[i]?.movieId &&
          theater._id === schedules[i]?.theaterId &&
          schedules[i]?.date === scheduleTime.date
        ) {
          timeSlots.push(schedules[i]);
        }
      }
      setTimeSlots(timeSlots);
    }
  }, [movie && theater && scheduleTime]);

  useEffect(() => {
    if (movieSchedules.length > 0) {
      debugger;
      localStorage.setItem("movieSchedules", JSON.stringify(movieSchedules));

      returnMenu(movieSchedules);
    }
  }, [movieSchedules]);

  useEffect(() => {
    if (timeSlots.length > 0) {
      returnMenu(timeSlots);
    }
  }, [timeSlots]);

  const returnslotMenu = (schedules) => {
    return schedules.map((schedule, index) => (
      <MenuItem key={index} value={schedule}>
        {schedule?.timeSlot}
      </MenuItem>
    ));
  };
  const returnMenu = (schedules) => {
    return schedules.map((schedule, index) => (
      
      <MenuItem key={index} value={schedule}>
        {schedule?.date.slice(0, schedule?.date.length-14)}
      </MenuItem>
    ));
  };
  const handleChangeTime = (event) => {
    setScheduleTime(event.target.value);
  };
  const handleChangeTimeSlot = (event) => {
    setTimeSlot(event.target.value);
  };
  return (
    <div>
      <Header username={userName} />
      {open ? (
        <Stack sx={{ width: "100%" }} spacing={2} className="float-right">
          <Alert severity="success">
            This is a success alert — check it out!
          </Alert>
        </Stack>
      ) : (
        ""
      )}

      {errorOpen ? (
        <Stack sx={{ width: "100%" }} spacing={2} className="float-right">
          <Alert severity="error">Network Error!</Alert>
        </Stack>
      ) : (
        ""
      )}
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
            <legend className="legendTitle">Book Movie</legend>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <div className="">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="theater-label">Select A Movie</InputLabel>

                    <Select
                      labelId="theater-label"
                      id="theater_id"
                      label="Theater"
                      value={movie}
                      onChange={handleChangeMovie}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {movies.map((movie, index) => (
                        <MenuItem key={index} value={movie}>
                          {movie.movieName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="theater-label">Select A Theater</InputLabel>

                    <Select
                      labelId="theater-label"
                      id="theater_id"
                      label="Theater"
                      value={theater}
                      onChange={handleChangeTheater}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {theaters.map((theater, index) => (
                        <MenuItem key={index} value={theater}>
                          {theater.theaterName}-{theater.theaterLocation}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="theater-label">Date</InputLabel>

                    <Select
                      labelId="theater-label"
                      id="theater_id"
                      label="Theater"
                      value={scheduleTime}
                      onChange={handleChangeTime}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {returnMenu(movieSchedules)}
                    </Select>
                  </FormControl>
                </div>
                <div className="">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="theater-label">Time Slot</InputLabel>

                    <Select
                      labelId="theater-label"
                      id="theater_id"
                      label="Theater"
                      value={timeSlot}
                      onChange={handleChangeTimeSlot}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {returnslotMenu(timeSlots)}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    id="outlined-required"
                    label="Number of seats"
                    name="movieDescription"
                    value={seatsSelected}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <TextField
                    disabled
                    id="outlined-required"
                    label="Price"
                    name="movieDescription"
                    value={calPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
              <Grid item md={6}>
                <div>
                  <p>Please Check the movie!</p>
                  <h6>Movie: {movie.movieName}</h6>
                  <h6>
                    Theater: {theater.theaterName}-{theater.theaterLocation}
                  </h6>
                  <h6>
                    Date: {moment(scheduleTime.date).format("DD-MM-YYYY")}
                  </h6>
                  <h6>Time: {scheduleTime.time}</h6>
                  <h6>Seats: {seatsSelected}</h6>
                  <h6>Price: {calPrice}</h6>
                </div>
              </Grid>
            </Grid>
            <Button
              spacing={2}
              className="float"
              variant="contained"
              onClick={handleSubmit}
            >
              Continue to payment
            </Button>
            <Button
              spacing={2}
              className="float"
              variant=""
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </fieldset>
        </Box>
      </div>
    </div>
  );
}
export default UserDashboard;
