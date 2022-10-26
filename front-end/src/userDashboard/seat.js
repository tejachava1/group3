import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/header";
import "./seat.css";
import axios from "axios";

function SeatBooking(props) {
  useEffect(() => {
    axios.get("http://localhost:3001/seatData").then((res) => {
      const resData = res.data;
      for (let i = 0; i < resData.length; i++) {
        if (resData[i].available === false) {
          document
            .getElementById(resData[i].seatNumber)
            .setAttribute("disabled", true);
        }
      }
    });
  });
  const navigate = useNavigate();

  const seatsColumns = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const seatsRows = ["A", "B", "C", "D", "E", "", "F", "G", "H", "I", "J"];
  const [selectingSeats, setSelectingSeats] = useState([]);

  const choiceSeat = (seat) => {
    const newBookedSeats = [...selectingSeats, seat];
    setSelectingSeats(newBookedSeats);
  };
  const SelectSeats = () => {
    const Selected = selectingSeats;
    if (Selected.length !== 0) {
      axios
        .post("http://localhost:3001/bookSeat", { seats: Selected })
        .then((res) => {
          navigate("/Invoice");
        });
    } else {
      alert("Please Select Seats");
    }
  };
  const seatsGenerator = () => {
    return (
      <table id="seatsBlock">
        <tbody>
          <tr>
            <td></td>
            {seatsColumns.map((column, index) => (
              <td key={index}>{column}</td>
            ))}
          </tr>
          {seatsRows.map((row, index) =>
            row === "" ? (
              <tr key={index} className="seatVGap"></tr>
            ) : (
              <tr key={index}>
                <td>{row}</td>
                {seatsColumns.map((column, index) => {
                  return column === "" ? (
                    <td key={index} className="seatGap"></td>
                  ) : (
                    <td key={index}>
                      <input
                        onClick={() => choiceSeat(`${row}${column}`)}
                        type="checkbox"
                        className="seats"
                        id={`${row}${column}`}
                        value={`${row}${column}`}
                      />
                    </td>
                  );
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };
  return (
    <div>
      <Header />
      <div>
        <div>
          <h1>Movie Seat Selection</h1>
          <div className="container">
            <div className="w3ls-reg" style={{ paddingTop: "0px" }}>
              <ul className="seat_w3ls">
                <li className="smallBox greenBox">Selected Seat</li>

                <li className="smallBox redBox">Reserved Seat</li>

                <li className="smallBox emptyBox">Empty Seat</li>
              </ul>
              <div
                className="seatStructure txt-center"
                style={{ overflowX: "auto" }}
              >
                {seatsGenerator()}
                <div className="screen">
                  <h2 className="wthree">Screen this way</h2>
                </div>
                <button
                  onClick={() => {
                    SelectSeats();
                  }}
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* */}
    </div>
  );
}

export default SeatBooking;
