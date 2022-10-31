import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../Header/adminHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./addmovie.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import "./addmovie.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AddTheater(props) {
  const username = localStorage.getItem("Name");

  let updateTheater = useLocation();
  const navigate = useNavigate();
  const [updateTure, setUpdateTrue] = useState(false);
  const [theaterId, setTheaterId] = useState(0);

  useEffect(() => {
    if (updateTheater.state && updateTheater.state.edit) {
      setUpdateTrue(true);
      setTheaterId(updateTheater.state._id);
      setTheaterForm({
        theaterLocation: updateTheater.state.theaterLocation,
        theaterName: updateTheater.state.theaterName,
        numberOfSeats: updateTheater.state.numberOfSeats,
        pricePerSeat: updateTheater.state.pricePerSeat,
        ticketsBooked: updateTheater.state.ticketsBooked,
      });
    } else {
      setTheaterForm({
        theaterLocation: "",
        theaterName: "",
        numberOfSeats: 0,
        pricePerSeat: 0,
        ticketsBooked: 0,
      });
    }
  }, [updateTheater]);
  const [theaterForm, setTheaterForm] = useState({
    theaterName: "",
    theaterLocation: "",
    numberOfSeats: 0,
    pricePerSeat: 0,
    ticketsBooked: 0,
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    // debugger
    const { name, value } = e.target;

    setTheaterForm({
      ...theaterForm,
      [name]: value,
    });
  };

  const handleCancel = (event) => {
    setTheaterForm({
      theaterLocation: "",
      theaterName: "",
      numberOfSeats: 0,
      pricePerSeat: 0,
      ticketsBooked: 0,
    });
    navigate("/Theaters");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/theaters", theaterForm)
      .then((response) => {
        if (response.status == 201) {
          navigate("/Theaters");
          handleClick();

          setTheaterForm({
            theaterLocation: "",
            theaterName: "",
            numberOfSeats: 0,
            pricePerSeat: 0,
          });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [vertical, setVertical] = React.useState("top");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const updateTheater = {
      theaterLocation: theaterForm.theaterLocation,
      theaterName: theaterForm.theaterName,
      numberOfSeats: theaterForm.numberOfSeats,
      pricePerSeat: theaterForm.pricePerSeat,
      ticketsBooked: theaterForm.ticketsBooked,
    };

    axios
      .put("http://localhost:3001/theaters/" + theaterId, updateTheater)
      .then((response) => {
        if (response.status == 200) {
          navigate("/Theaters");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
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
      <Snackbar open={open} autoHideDuration={1000}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Theater successfully added.
        </Alert>
      </Snackbar>
      <div className="form-theater">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <fieldset className="fieldset-Theater">
              <legend className="legendTitle">
                {updateTure ? "Update Theater" : "Add Theater"}
              </legend>
              <Grid item lg={12}>
                <div className="">
                  <TextField
                    required
                    id="outlined-required"
                    label="Theater Name"
                    name="theaterName"
                    value={theaterForm.theaterName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Location"
                    name="theaterLocation"
                    value={theaterForm.theaterLocation}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-required"
                    label="No of Seats"
                    name="numberOfSeats"
                    value={theaterForm.numberOfSeats}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-required"
                    label="Price per seat"
                    name="pricePerSeat"
                    value={theaterForm.pricePerSeat}
                    onChange={handleInputChange}
                  />
                </div>
                {updateTure ? (
                  <Button
                    spacing={2}
                    className="float"
                    variant="contained"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    spacing={2}
                    className="float"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                )}
                <Button
                  spacing={2}
                  className="float"
                  variant=""
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </fieldset>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
export default AddTheater;
