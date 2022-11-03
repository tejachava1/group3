import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../Header/adminHeader";
import "./addmovie.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Axios from "axios";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddSchedule(props) {
  const username = localStorage.getItem("Name");

  const updateSchedule = useLocation();
  const navigate = useNavigate();
  const [movies, setMovies] = React.useState([]);
  const [theaters, setTheaters] = useState([]);
  const [day, setDay] = useState("");
  const [movie, setMovie] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [theater, setTheater] = useState("");
  const [seats, setSeats] = useState(0);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [updateTure, setUpdateTrue] = useState(false);
  const [scheduleId, setScheduleId] = useState(0);
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, timeSlot: "11:30 am" },
    { id: 2, timeSlot: "2:10 pm" },
    { id: 3, timeSlot: "6:00 pm" },
    { id: 4, timeSlot: "9:30 pm" },
  ]);
  useEffect(() => {
    if (updateSchedule.state && updateSchedule.state.edit) {
      setUpdateTrue(true);
      setScheduleId(updateSchedule.state.scheduleId);
      setTimeSlot(updateSchedule.state.timeSlot);
      setDate(
        moment(updateSchedule.state.date).add(1, "days").format("YYYY-MM-DD")
      );
      setSeats(updateSchedule.state.seatAvailable);
      setMovie(updateSchedule.state.movieId);
      setTheater(updateSchedule.state.theaterId);
    }
  }, [updateSchedule]);

  useEffect(() => {
    Axios.get("http://localhost:3001/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {});

    Axios.get("http://localhost:3001/theaters")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {});
  }, []);

  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState("top");
  const [horizontal, setHorizontal] = React.useState("right");

  const handleClick = () => {
    setOpen(true);
  };

  const handleCancel = (event) => {
    // setMovieForm({
    //     movieName: '',
    //     movieDescription: '',
    //     movieDirector: '',
    //     movieRating: 0,
    //     moviePrice: 0
    // })
    navigate("/Schedules");
  };
  const handleSubmit = (event) => {
    let schedule = {
      movieId: movie,
      theaterId: theater,
      timeSlot: timeSlot,
      seatAvailable: seats,
      date: date,
    };
    event.preventDefault();

    Axios.post("http://localhost:3001/schedules", schedule)
      .then((response) => {
        if (response.status == 201) {
          handleClick();
          // navigate('/Schedules')

          setDate("");
          setMovie("");
          setTheater("");
          setTimeSlot("");
          setSeats(0);
        }
      })
      .catch((error) => {
        setError(error.message);
        // handleClickError();
      });
  };

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };
  const handleChangeMovie = (event) => {
    setMovie(event.target.value);
  };
  const handleChangeTimeSlot = (event) => {
    setTimeSlot(event.target.value);
  };
  const handleChangeTheater = (event) => {
    setTheater(event.target.value);
  };
  const handleInputChange = (event) => {
    setSeats(event.target.value);
  };
  const handleInputChangeTime = (event) => {
    setTime(event.target.value);
  };
  const handleInputChangeDate = (event) => {
    let datetosting = new Date(event.target.value);
    setDate(event.target.value);
  };

  const handleUpdate = (event) => {
    let schedule = {
      movieId: movie,
      theaterId: theater,
    };
    Axios.put("http://localhost:3001/schedules/" + scheduleId, schedule).then(
      (response) => {
        if (response.status == 201) {
          navigate("/Schedules");
        }
      }
    );
  };
  return (
    <div>
      <AdminHeader username={username} />
      {error == "" ? (
        <p></p>
      ) : (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Theater successfully added.
        </Alert>
      </Snackbar>
      <div className="form-schedule">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <fieldset className="fieldset-schedule">
            <legend className="legendTitle-schedule">
              {updateTure ? "Update Schedule" : " Add Schedule"}
            </legend>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <div className="">
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    // defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={date}
                    onChange={handleInputChangeDate}
                  />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="movie-label">Movie</InputLabel>

                    <Select
                      labelId="movie-label"
                      id="movie_id"
                      value={movie}
                      onChange={handleChangeMovie}
                      label="Movie"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {movies.map((movie, index) => (
                        <MenuItem key={index} value={movie._id}>
                          {" "}
                          {movie.movieName}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="theater-label">Theater</InputLabel>

                    <Select
                      labelId="theater-label"
                      id="theater_id"
                      value={theater}
                      onChange={handleChangeTheater}
                      label="Theater"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {theaters.map((theater, index) => (
                        <MenuItem key={index} value={theater._id}>
                          {" "}
                          {theater.theaterName}- {theater.theaterLocation}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue="Location"
                                />

                            </div> */}
              </Grid>
              <Grid item md={6}>
                {/* <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Seats Available"
                    value={seats}
                    onChange={handleInputChange}
                  />
                </div> */}

                <div>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="movie-label">Time Slot</InputLabel>
                    <Select
                      labelId="movie-label"
                      id="time-slot"
                      value={timeSlot}
                      onChange={handleChangeTimeSlot}
                      label="Time Slot"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {timeSlots.map((slot, index) => (
                        <MenuItem key={index} value={slot.timeSlot}>
                          {" "}
                          {slot.timeSlot}{" "}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                {updateTure ? (
                  <Button
                    className="float"
                    spacing={2}
                    variant="contained"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    className="float"
                    spacing={2}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  className="float"
                  spacing={2}
                  variant=""
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </fieldset>
        </Box>
      </div>
    </div>
  );
}
export default AddSchedule;
