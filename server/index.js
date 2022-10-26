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
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/Movies", {
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

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});
// app.get("/", async (req, res) => {
//     const user = new UserModel({
//         userId: 1,
//         name: "Teja",
//         emailId: "teja.chava4@gmail.com",
//         password:"lynchkingpin",
//         phoneNumber:"8919939071"
//     });
//     try{
//         await user.save();
//         console.log('inserted');
//         res.send('inserted data')
//     } catch(err) {
//         console.log(err);
//     }
// })

app.use(express.json());
app.use(UserRouter);
app.use(AdminRouter);
app.use(MovieRouter);
app.use(TheaterRouter);
app.use(ScheduleRouter);
app.use(TicketRouter);
app.use(SeatRouter);

app.listen(3001, () => {
  console.log("server running on port 3001.... ");
});
