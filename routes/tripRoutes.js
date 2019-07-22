const mongoose = require("mongoose");
const Trip = mongoose.model("trips");
const User = mongoose.model("users");
const rp = require("request-promise");
const keys = require("../config/keys");

module.exports = app => {
  //add to fave  trip
  app.post("/api/:uId/addFave/:tId", async (req, res) => {
    let { uId, tId } = req.params;

    const user = await User.findById(uId);
    user.trips.push(tId);
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  //remove fave trip
  app.put("/api/:uId/deleteFave/:tId", async (req, res) => {
    let { uId, tId } = req.params;

    const user = await User.findById(uId);
    let index = user.trips.indexOf(tId);
    user.trips.splice(index, 1);
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  //get 1 trip
  app.get("/api/trips/:id", async (req, res) => {
    let id = req.params.id;
    const trip = await Trip.findById(id);

    res.send(trip);
  });

  //Add to do
  app.post("/api/trips/:id", async (req, res) => {
    let id = req.params.id;
    const trip = await Trip.findById(id);

    trip.thingsToDo.push(req.body);
    try {
      await trip.save();
      res.send(trip);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.get("/api/alltrips", async (req, res) => {
    const trips = await Trip.find({});

    try {
      res.send(trips);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //get all trips by user
  app.get("/api/trips", async (req, res) => {
    let id = req.user.id;
    const trips = await Trip.find({ _user: id });

    res.send(trips);
  });

  //get featured trips

  app.get("/api/featuredTrip", async (req, res) => {
    const trips = await Trip.aggregate([{ $sample: { size: 6 } }]);

    res.send(trips);
  });
  //edit trip info
  app.put("/api/trip/edit", async (req, res) => {
    let id = req.body._id;

    const trip = await Trip.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    try {
      await trip.save();
      res.send(trip);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //remove todo
  app.get("/api/trips/:id/delete/:toDoId", async (req, res) => {
    const id = req.params.id;
    const toDoId = req.params.toDoId;
    const trip = await Trip.findById(id);
    trip.thingsToDo.pull({ _id: toDoId });
    try {
      await trip.save();
      res.send(trip);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //create trip
  app.post("/api/trips", async (req, res) => {
    const {
      tripName,
      fromDest,
      toDest,
      departDate,
      returnDate,
      flightCost,
      numPeople,
      description,
      image
    } = req.body;

    let fromD = fromDest.split(" - ");
    let toD = toDest.split(" - ");
    const location = `${toD[1]}, ${toD[2]}, ${toD[3]}`;

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
    let d = new Date();
    let dd = d.getDate();
    let mm = d.getMonth() + 1;
    let yyyy = d.getFullYear();

    const trip = new Trip({
      tripName,
      fromDest,
      toDest,
      description,
      image,
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
      dateCreated: `${mm}/${dd}/${yyyy}`,
      author: req.user.name
    });

    try {
      await trip.save();
      res.send(trip);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  //get all fave trips
  app.get("/api/getFaveTrips", async (req, res) => {
    const tripList = req.user.trips;

    const trip = await Trip.find({ _id: { $in: tripList } });
    res.send(trip);
  });
};
