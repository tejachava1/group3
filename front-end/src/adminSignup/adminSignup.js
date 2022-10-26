import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Axios from "axios";
import "./adminSignup.css";
import HomeHeader from "../Header/homeHeader";
function AdminSignup() {
  const [values, setValues] = useState({
    name: "",
    emailId: "",
    phoneNumber: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const signup = () => {
    if (values.password === confirmPassword) {
      Axios.post("http://localhost:3001/admin", values)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    console.log("signup");
  };
  return (
    <div>
      <HomeHeader />
      <div className="adminSignup">
        <div>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            value={values.name}
            onChange={handleChange("name")}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Email Id"
            variant="standard"
            value={values.emailId}
            onChange={handleChange("emailId")}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Phone Number"
            variant="standard"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
          />
        </div>
        <Button variant="contained" onClick={signup}>
          Signup
        </Button>
      </div>
    </div>
  );
}
export default AdminSignup;
