import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/header";
import "./seat.css";
import axios from "axios";

function Invoice(props) {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [TotalSeats, setTotalSeats] = useState("");
  const [TotalPrice, setTotalPrice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/invoice").then((res) => {
      setSeats(res.data.Seats);
      setTotalSeats(res.data.totalSeats);
      setTotalPrice(res.data.totalPrice);
    });
  });

  return (
    <div>
      <Header />
      <div>
        <h1>Movie Seat Selection</h1>
        <div className="container">
          <div
            className="w3ls-reg"
            style={{ display: "unset", flexWrap: "unset", paddingTop: "0px" }}
          >
            <div
              className="displayerBoxes txt-center"
              style={{ overflowX: "auto" }}
            >
              <table className="Displaytable w3ls-table" width="100%">
                <tbody>
                  <tr>
                    <th>Seats</th>
                    <th>Total Seats</th>
                    <th>Total Price</th>
                  </tr>
                  <tr>
                    <td>
                      <h6>
                        {seats.map((data) => (
                          <span key={data}>{data}, </span>
                        ))}
                      </h6>
                    </td>
                    <td>
                      <h6>{TotalSeats}</h6>
                    </td>
                    <td>
                      <h6>£{parseFloat(TotalPrice).toFixed(2)}</h6>
                      <textarea
                        style={{ visibility: "hidden", height: "1px" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <br />
              <button
                onClick={() => {
                  navigate("/Seatbooking");
                }}
              >
                Book More Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Invoice;
