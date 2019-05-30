const mongoose = require("mongoose");
const Trip = mongoose.model("trips");

module.exports = app => {
  app.get("/api/trips/:id", async (req, res) => {
    let id = req.params.id;
    const trip = await Trip.findById(id);

    res.send(trip);
  });

  app.get("/api/trips", async (req, res) => {
    let id = req.user.id;
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
      fromDest,
      toDest,
      toDe: {
        city: toD[2],
        country: toD[3],
        code: toD[0],
        name: toD[1]
      },
      fromDe: {
        city: fromD[2],
        country: fromD[3],
        code: fromD[0],
        name: fromD[1]
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
