const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

module.exports = app =>{
    app.post('/api/trips', async (req, res) =>{
        console.log(req.body);
        const {tripName, fromDest, toDest, departDate, returnDate, flightCost, numPeople} = req.body;

        const trip = new Trip({
            tripName,
            fromDest,
            toDest,
            departDate,
            returnDate,
            flightCost,
            numPeople,
            thingsToDo: [],
            _user: req.user.id,
            dateCreated: Date.now()
        });
        try{
            await trip.save();
            res.send(trip);
        }catch(err){
            res.status(422).send(err);
        }
        
    });
}