const mongoose = require("mongoose");
const Trip = mongoose.model("trips");
const rp = require("request-promise");
const keys = require("../config/keys");

module.exports = app => {
  app.get("/api/trips/:id", async (req, res) => {
    let id = req.params.id;
    const trip = await Trip.findById(id);

    res.send(trip);
  });

  app.post("/api/trips/:id", async (req, res) => {
    let id = req.params.id;
    const trip = await Trip.findById(id);

    trip.thingsToDo.push(req.body);
    trip.save();
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
    const location = `${toD[1]}, ${toD[2]}, ${toD[3]}`;
    console.log(location);
    const options = {
      uri: `http://www.mapquestapi.com/geocoding/v1/address?key=${
        keys.mapquestKey
      }&location=${location}`,
      method: "GET"
    };

    const response = await rp(options);
    const json = await JSON.parse(response);
    const lat = json.results[0].locations[0].latLng.lat;
    const long = json.results[0].locations[0].latLng.lng;

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
      location: { lat: lat, long: long },
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
