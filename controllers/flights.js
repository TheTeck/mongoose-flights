const Flight = require('../models/flight');
const { render } = require('../server');

module.exports = {
    index,
    new: newFlight,
    create
}

function index (req, res) {
    Flight.find({}, function (err, flights) {
        flights.sort(function (a, b) {
            return +a.departs - +b.departs
        })
        res.render('flights/index', {flights, title: 'All Flights'})
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