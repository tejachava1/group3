const express = require("express");

const router = new express.Router();

const CinemaSeat = [];
for (let i = 0; i < 10; i++) {
  let SeatChar, SeatPrice;
  if (i === 0) SeatChar = "A";
  else if (i === 1) SeatChar = "B";
  else if (i === 2) SeatChar = "C";
  else if (i === 3) SeatChar = "D";
  else if (i === 4) SeatChar = "E";
  else if (i === 5) SeatChar = "F";
  else if (i === 6) SeatChar = "G";
  else if (i === 7) SeatChar = "H";
  else if (i === 8) SeatChar = "I";
  else if (i === 9) SeatChar = "J";
  if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4) SeatPrice = 19.99;
  else SeatPrice = 12.99;
  for (let j = 0; j < 12; j++) {
    CinemaSeat.push({
      seatNumber: SeatChar + (j + 1),
      price: SeatPrice,
      available: true,
      //   disabilityAccessible: true,
    });
  }
}

// router.post("/seats")

router.get("/seatData", (req, res) => {
  res.status(200).json(CinemaSeat);
});

router.post("/bookSeat", (req, res) => {
  let Price = 0;
  for (let j = 0; j < req.body.seats.length; j++) {
    for (let i = 0; i < CinemaSeat.length; i++) {
      if (CinemaSeat[i].seatNumber === req.body.seats[j]) {
        CinemaSeat[i].available = false;
        Price = Price + parseFloat(CinemaSeat[i].price);
        break;
      }
    }
  }
  res.status(200).json({ msg: "success" });
});
router.get("/invoice", (req, res) => {
  let Price = 0;
  const TotalSeat = [];
  for (let i = 0; i < CinemaSeat.length; i++) {
    if (CinemaSeat[i].available === false) {
      TotalSeat.push(CinemaSeat[i].seatNumber);
      Price = Price + parseFloat(CinemaSeat[i].price);
    }
  }
  res.status(200).json({
    Seats: TotalSeat,
    totalSeats: TotalSeat.length,
    totalPrice: Price,
  });
});
module.exports = router;
