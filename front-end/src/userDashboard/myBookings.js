import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Header from "../Header/header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
function MyBookings(props) {
  const [userData, setUserData] = useState({});
  const [tickets, setTickets] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [newTickets, setNewTickets] = useState([]);
  const [cancelSucc, setCancelSucc] = useState(false);
  const [payments, setPayments] = useState([]);
  const cancelTicket = (data) => {
    console.log(data);

    // let theaterData = {
    //   theaterLocation: data.theaterLocation,
    //   theaterName: data.theaterName,
    //   numberOfSeats: data.numberOfSeats + 1,
    //   pricePerSeat: data.pricePerSeat,
    //   ticketsBooked: data.ticketsBooked - 1,
    // };

    let scheduleData = {
      date: data.date,
      movieId: data.movieId,
      noOfSeats_schedule: data.noOfSeats_schedule + 1,
      theaterId: data.theaterId,
      timeSlot: data.timeSlot,
      ticketsBooked: data.ticketsBooked - 1,
    };

    let ticketData = {
      scheduleId: data.scheduleId,
      price: data.price,
      noOfSeats_ticket: data.noOfSeats_ticket - 1,
      userId: data.userId,
      seatNumber: 0,
      status: "cancelled",
      bookingReference: data.bookingReference,
    };

    let paymentData = {
      userId: data.userId,
      totalAmount: data.price,
      refundedAmount: data.price / data.noOfSeats_ticket,
      bookingReference: data.bookingReference,
    };

    console.log(`ticketData `);
    console.log(ticketData);
    console.log(`scheduleData ${scheduleData}`);
    console.log(paymentData);

    axios
      .put(`http://localhost:3001/ticket/${data.ticket_id}`, ticketData)
      .then((response) => {
        setCancelSucc(true);
      })
      .catch((error) => {
        setCancelSucc(false);
      });

    axios
      .put(`http://localhost:3001/schedules/${data.scheduleId}`, scheduleData)
      .then((response) => {
        if (userData !== null && userData !== {} && userData._id) {
          axios
            .get(`http://localhost:3001/ticket/${userData._id}`)
            .then((response) => {
              console.log(response.data);
              setTickets(response.data);
            });
        }
      });

    console.log(paymentData);
    axios
      .put(
        `http://localhost:3001/payment/${ticketData.userId}/${ticketData.bookingReference}`,
        paymentData
      )
      .then((response) => {
        console.log(response);
      });
  };
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
    axios
      .get("http://localhost:3001/schedules")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {});
    axios
      .get("http://localhost:3001/payment")
      .then((response) => {
        console.log(response);
        setPayments(response.data[0]);
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
    if (tickets.length > 0) {
      getNewTickets(movies, theaters, schedules);
      console.log(newTickets);
    }
  }, [tickets]);

  const getNewTickets = (movies, theaters, schedules) => {
    let newtickets = [];
    tickets.forEach((ticket) => {
      let schedule_id = ticket.scheduleId;
      let schedulesArr = [];
      schedulesArr = schedules;
      let schedule = schedulesArr.filter((sch) => sch._id === schedule_id)[0];
      let theaterId = schedule.theaterId;
      let theater = theaters.filter((thea) => thea._id === theaterId)[0];
      let movieId = schedule.movieId;
      let movie = movies.filter((movie) => movie._id === movieId)[0];
      ticket.ticket_id = ticket._id;
      ticket = { ...ticket, ...schedule, ...theater, ...movie };
      console.log(ticket);
      newtickets.push(ticket);
    });
    setNewTickets(newtickets);
  };

  useEffect(() => {
    if (movies && theaters && schedules) {
    }
  }, [movies && theaters && schedules]);
  useEffect(() => {
    if (userData !== null && userData !== {} && userData._id) {
      axios
        .get(`http://localhost:3001/ticket/${userData._id}`)
        .then((response) => {
          console.log(response.data);
          setTickets(response.data);
        });
    }
  }, [userData]);

  return (
    <div>
      <Header></Header>
      <div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {newTickets.map((data, i) => (
            <Grid item xs={3} key={i}>
              <Card>
                <CardContent>
                  <p>Movie: {data.movieName}</p>
                  <p>Theater: {data.theaterName}</p>
                  <p>Location: {data.theaterLocation}</p>
                  <p>Seat Number: {data.seatPosition}</p>
                  <p>Time Slot: {data.timeSlot}</p>
                  <p>Status:{data.status}</p>
                </CardContent>
                <CardActions>
                  {data.status === "confirmed" ? (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        cancelTicket(data);
                      }}
                    >
                      Cancel Booking
                    </Button>
                  ) : (
                    ""
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* {newTickets.map((data, i) => (
          <Card key={i}>
            <CardContent>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                
              </Grid>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </div>
  );
}
export default MyBookings;
