const express = require("express");
const mongoose = require("mongoose");
const app = express();

const UserRouter = require("./routes/user");
const AdminRouter = require("./routes/admin");
const MovieRouter = require("./routes/movie");
const TheaterRouter = require("./routes/theaters");
const ScheduleRouter = require("./routes/schedule");
const TicketRouter = require("./routes/ticket");
const SeatRouter = require("./routes/seat");
const Payment = require("./routes/payment");
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Online_Tickets", {
  useNewUrlParser: true,
});
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  next();
});

app.use(express.json());
app.use(UserRouter);
app.use(AdminRouter);
app.use(MovieRouter);
app.use(TheaterRouter);
app.use(ScheduleRouter);
app.use(TicketRouter);
app.use(SeatRouter);
app.use(Payment);

app.listen(3001, () => {
  console.log("server running on port 3001.... ");
});
