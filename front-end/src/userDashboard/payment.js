import React from "react";
import Header from "../Header/header";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./userDashboard.css";
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import './payment.css';
function Payment(props) {
  let movieDetails = useLocation();
  console.log(movieDetails)
  return (
    <div>
      <Header />
      <div className="container-payment">
        <div className="row">
                <div className="panel">
                    <div className="panel-heading">
                        <div className="row">
                            <h3 className="text-center">Payment Details</h3>
                            <div className="inlineimage"> 
                        </div>
                    </div>
                    <div className="panel-body">
                                <div className="col-xs-12">
                                    <TextField id="outlined-basic" label="Card Number" variant="outlined" />
                                    </div>
                                    <br/>
                                <div className="col-xs-7 col-md-7">
                                <TextField id="outlined-basic" label="Expiration Date" variant="outlined" />

                                </div>
                                <br/>

                                <div className="col-xs-5 col-md-5 pull-right">
                                <TextField id="outlined-basic" label="CV Code" variant="outlined" />

                                </div>
                                <br/>

                                <div className="col-xs-12">
                                <TextField id="outlined-basic" label="Name on Card" variant="outlined" />

                                </div>
                                <br/>

                    </div>
                    <div className="panel-footer">
                            <div className="col-xs-12"> <Button className="btn btn-success btn-lg btn-block" variant="outlined">Confirm Payment</Button> </div>
                    </div>
                    <br/>
                </div>
            </div>
        </div>
    </div>
    </div>
   
  );
}
export default Payment;
