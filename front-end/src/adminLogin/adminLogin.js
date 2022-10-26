import React, { useState } from "react";
import "./adminLogin.css";
import HomeHeader from "../Header/homeHeader";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AdminLogin() {
  const [errorTrue, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [values, setValues] = useState({
    emailId: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const login = () => {
    Axios.post(`http://localhost:3001/adminLogin`, values)
      .then((response) => {
        debugger;
        console.log(response);
        // navigate('/addSchedule', { state: data });
        navigate("/Movies", { state: response.data });
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          setError(true);
          // setErrorMessage(error.response.data.message);
        }
      });
  };
  return (
    <div>
      <HomeHeader />
      {errorTrue ? <div className="loginerror">{errorMessage}</div> : ""}

      <div className="UserLogin">
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
            label="password"
            variant="standard"
            value={values.password}
            onChange={handleChange("password")}
          />
        </div>
        <div>
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
