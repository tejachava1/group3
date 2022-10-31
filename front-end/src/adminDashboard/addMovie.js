import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../Header/adminHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function AddMovie(props) {
  const username = localStorage.getItem("Name");

  let updateMovie = useLocation();
  const navigate = useNavigate();
  const [updateTure, setUpdateTrue] = useState(false);
  const [movieId, setMovieId] = useState(0);

  useEffect(() => {
    if (updateMovie.state && updateMovie.state.edit) {
      setUpdateTrue(true);
      setMovieId(updateMovie.state._id);
      setMovieForm({
        movieName: updateMovie.state.movieName,
        movieDescription: updateMovie.state.movieDescription,
        movieDirector: updateMovie.state.movieDirector,
        movieRating: updateMovie.state.movieRating,
      });
    } else {
      setMovieForm({
        movieName: "",
        movieDescription: "",
        movieDirector: "",
        movieRating: 0,
      });
    }
  }, [updateMovie]);

  const [movieForm, setMovieForm] = useState({
    movieName: "",
    movieDescription: "",
    movieDirector: "",
    movieRating: 0,
  });
  const handleInputChange = (e) => {
    // debugger
    const { name, value } = e.target;
    if (name == "movieRating") {
      setMovieForm({
        ...movieForm,
        [name]: +value,
      });
    } else if (name == "Movieprice") {
      setMovieForm({
        ...movieForm,
        [name]: +value,
      });
    } else {
      setMovieForm({
        ...movieForm,
        [name]: value,
      });
    }
  };

  const handleCancel = (event) => {
    setMovieForm({
      movieName: "",
      movieDescription: "",
      movieDirector: "",
      movieRating: 0,
    });
    navigate("/Movies");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:3001/movies", movieForm)
      .then((response) => {
        if (response.status == 201) {
          handleClick();
          navigate("/Movies");
          setMovieForm({
            movieName: "",
            movieDescription: "",
            movieDirector: "",
            movieRating: 0,
          });
        }
      })
      .catch((error) => {
        handleClickError();
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const updateMovie = {
      movieName: movieForm.movieName,
      movieDescription: movieForm.movieDescription,
      movieDirector: movieForm.movieDirector,
      movieRating: movieForm.movieRating,
    };

    Axios.put("http://localhost:3001/movies/" + movieId, updateMovie)
      .then((response) => {
        if (response.status === 201) {
          navigate("/Movies");
        }
      })
      .catch((error) => {
        handleClickError();
      });
  };

  const [open, setOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);

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

  return (
    <div>
      <AdminHeader username={username} />
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
            <legend className="legendTitle">
              {!updateTure ? "Add Movie" : "Update Movie"}{" "}
            </legend>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <div className="">
                  <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    name="movieName"
                    value={movieForm.movieName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-required"
                    label="Description"
                    name="movieDescription"
                    value={movieForm.movieDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Director Name"
                    name="movieDirector"
                    value={movieForm.movieDirector}
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
              <Grid item md={4}>
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Movie Rating"
                    name="movieRating"
                    type="number"
                    value={movieForm.movieRating}
                    onChange={handleInputChange}
                  />
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
export default AddMovie;
