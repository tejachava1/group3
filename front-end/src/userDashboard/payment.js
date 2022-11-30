import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../Header/header";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import "./payment.css";
import axios from "axios";
function Payment(props) {
  const navigate = useNavigate();
  let movieDetails = useLocation();
  const [ticketIds, setTicketIds] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvCode: "",
    nameOnCard: "",
  });
  const [enableBut, setEnableBut] = useState(true);
  const handleInputChange = (e) => {
    // debugger
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
    if (
      paymentDetails.cardNumber !== "" &&
      paymentDetails.expirationDate !== "" &&
      paymentDetails.cvCode !== "" &&
      paymentDetails.nameOnCard !== ""
    ) {
      setEnableBut(false);
    }
  };

  const confirmPayment = () => {
    console.log(movieDetails);
    let ticket = movieDetails.state.ticketsData[0];
    console.log(ticket);
    let paymentDetails = {
      userId: ticket.userId,
      bookingReference: ticket.bookingReference,
      totalAmount: ticket.price,
      refundedAmount: 0,
      date: new Date(),
    };
    console.log(movieDetails);

    axios
      .post("http://localhost:3001/payment", paymentDetails)
      .then((response) => {
        navigate("/Invoice", { state: movieDetails });
      });
  };

  return (
    <div>
      <Header />
      <div className="container-payment">
        <div className="row">
          <div className="panel">
            <div className="panel-heading">
              <div className="row">
                <h3 className="text-center">Payment Details</h3>
                <div className="inlineimage"></div>
              </div>
              <div className="panel-body">
                <div className="col-xs-12">
                  <TextField
                    id="outlined-basic"
                    label="Card Number"
                    variant="outlined"
                    inputProps={{ maxLength: 16 }}
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <br />
                <div className="col-xs-7 col-md-7">
                  <TextField
                    id="outlined-basic"
                    label="Expiration Date"
                    variant="outlined"
                    name="expirationDate"
                    value={paymentDetails.expirationDate}
                    onChange={handleInputChange}
                  />
                </div>
                <br />

                <div className="col-xs-5 col-md-5 pull-right">
                  <TextField
                    id="outlined-basic"
                    label="CV Code"
                    variant="outlined"
                    inputProps={{ maxLength: 4 }}
                    name="cvCode"
                    value={paymentDetails.cvCode}
                    onChange={handleInputChange}
                  />
                </div>
                <br />

                <div className="col-xs-12">
                  <TextField
                    id="outlined-basic"
                    label="Name on Card"
                    variant="outlined"
                    name="nameOnCard"
                    value={paymentDetails.nameOnCard}
                    onChange={handleInputChange}
                  />
                </div>
                <br />
              </div>
              <div className="panel-footer">
                <div className="col-xs-12">
                  {" "}
                  <Button
                    className="btn btn-success btn-lg btn-block"
                    variant="outlined"
                    onClick={confirmPayment}
                    disabled={enableBut}
                  >
                    Confirm Payment
                  </Button>{" "}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
