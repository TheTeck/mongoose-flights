const Flight = require('../models/flight');
const { render } = require('../server');

module.exports = {
    index,
    new: newFlight
}

function index (req, res) {
    Flight.find({}, function (err, flights) {
        res.render('flights/index', {flights, title: 'All Flights'})
    })
}

function newFlight (req, res) {
    res.render('flights/new', {title: 'New Flight'})
}