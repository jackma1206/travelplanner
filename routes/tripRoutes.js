const mongoose = require("mongoose");
const Trip = mongoose.model("trips");

module.exports = app => {
  app.get("/api/trips", async (req, res) => {
    console.log(req.user.id);
    const id = req.user.id;
    const trips = await Trip.find({ _user: id });

    res.send(trips);
  });

  app.post("/api/trips", async (req, res) => {
    const {
      tripName,
      fromDest,
      toDest,
      departDate,
      returnDate,
      flightCost,
      numPeople
    } = req.body;

    let fromD = fromDest.split(" - ");
    let toD = toDest.split(" - ");

    const trip = new Trip({
      tripName,
      fromDest: {
        city: fromD[1],
        country: fromD[2],
        code: fromD[0]
      },
      toDest: {
        city: toD[1],
        country: toD[2],
        code: toD[0]
      },
      departDate,
      returnDate,
      flightCost,
      numPeople,
      thingsToDo: [],
      _user: req.user.id,
      dateCreated: Date.now()
    });
    try {
      await trip.save();
      res.send(trip);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
