const Flight = require('../models/flight');
const { render } = require('../server');

module.exports = {
    index,
    new: newFlight,
    create
}

function index (req, res) {
    Flight.find({}, function (err, flights) {
        res.render('flights/index', {flights, title: 'All Flights'})
    })
}

function newFlight (req, res) {
    res.render('flights/new', {title: 'New Flight'})
}

function create (req, res) {
    const flight = new Flight(req.body)
    const dt = flight.departs
    const departsDate = dt.toISOString().slice(0, 16);

    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        res.redirect('/flights')
    })
}