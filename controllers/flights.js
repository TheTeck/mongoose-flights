const Flight = require('../models/flight');
const { render } = require('../server');

module.exports = {
    index,
    new: newFlight,
    create,
    show
}

function index (req, res) {
    Flight.find({}, function (err, flights) {
        flights.sort(function (a, b) {
            return +a.departs - +b.departs
        })
        let today = new Date()
        res.render('flights/index', {flights, title: 'All Flights', today})
    })
}

function newFlight (req, res) {
    const flight = new Flight()
    const dt = flight.departs
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', {title: 'Add Flight', departsDate})
}

function create (req, res) {
    const flight = new Flight(req.body)
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        res.redirect('/flights')
    })
}

function show (req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        flight.destinations.sort(function (a, b) {
            return +a.arrival - +b.arrival
        })
        res.render('flights/show', {title: 'Flight Details', flight})
    })
}