import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminHeader from "../Header/adminHeader";
import "./addmovie.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import moment from "moment";

import { EditRoadTwoTone } from "@mui/icons-material";
function Schedule(props) {
  const username = localStorage.getItem("Name");

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [schedules, setSchedules] = useState([]);

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
  }, []);
  useEffect(() => {
    if (schedules && movies && theaters) {
      let schedulenew = {};
      let schedulesnew = [];
      for (var i = 0; i <= schedules.length - 1; i++) {
        for (var j = 0; j <= movies.length - 1; j++) {
          if (movies[j]._id === schedules[i].movieId) {
            schedulenew = {
              date: "",
              movieId: 0,
              movieName: "",
              theaterName: "",
              scheduleId: 0,
              theaterId: 0,
              timeSlot: "",
            };
            schedulenew.date = schedules[i]?.date;
            schedulenew.movieId = schedules[i]?.movieId;
            schedulenew.movieName = movies[j]?.movieName;
            schedulenew.theaterId = schedules[i]?.theaterId;
            schedulenew.scheduleId = schedules[i]?._id;
            schedulenew.timeSlot = schedules[i]?.timeSlot;
          }
        }

        for (var k = 0; k <= theaters.length - 1; k++) {
          if (theaters[k]._id === schedules[i].theaterId) {
            schedulenew.theaterName = theaters[k]?.theaterName;
          }
        }
        schedulesnew.push(schedulenew);
        setSchedules(schedulesnew);
      }
    }
  }, [schedules && movies && theaters]);
  const editMovie = (schedule) => {
    let data = {
      ...schedule,
      edit: true,
    };
    navigate("/addSchedule", { state: data });
  };

  const addMovie = () => {
    let data = {
      edit: false,
    };
    navigate("/addSchedule", { state: data });
  };
  return (
    <div>
      <AdminHeader username={username} />
      <div className="tablemodel">
        <Button
          variant="contained"
          className="float"
          onClick={() => addMovie()}
        >
          Add Schedule
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie Name</TableCell>
                <TableCell align="left">Theater Name</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Time slot&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((movie) => (
                <TableRow
                  key={movie.movieId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => editMovie(movie)}
                >
                  <TableCell component="th" scope="movie">
                    {movie.movieName}
                  </TableCell>
                  <TableCell align="left">{movie.theaterName}</TableCell>
                  <TableCell align="left">
                    {moment(movie.date).add(1, "days").format("MM-DD-YYYY")}
                  </TableCell>
                  <TableCell align="left">{movie.timeSlot}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Schedule;
