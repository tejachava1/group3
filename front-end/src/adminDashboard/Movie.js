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

import { EditRoadTwoTone } from "@mui/icons-material";
function Movie(props) {
  const username = localStorage.getItem("Name");
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {});
  }, []);

  const editMovie = (movie) => {
    let data = {
      ...movie,
      edit: true,
    };
    navigate("/addMovie", { state: data });
  };

  const addMovie = () => {
    let data = {
      edit: false,
    };
    navigate("/addMovie", { state: data });
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
          Add Movie
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Driector</TableCell>
                <TableCell align="left">Rating&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow
                  key={movie.movieId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => editMovie(movie)}
                >
                  <TableCell component="th" scope="movie">
                    {movie.movieName}
                  </TableCell>
                  <TableCell align="left">{movie.movieDescription}</TableCell>
                  <TableCell align="left">{movie.movieDirector}</TableCell>
                  <TableCell align="left">{movie.movieRating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Movie;
