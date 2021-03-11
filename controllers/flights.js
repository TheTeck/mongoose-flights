const Flight = require('../models/flight');
const Ticket = require('../models/ticket')

module.exports = {
    index,
    new: newFlight,
    create,
    show
}

async function index (req, res) {
    try {
        const flights = await Flight.find({})
        flights.sort(function (a, b) {
            return +a.departs - +b.departs
        })
        let today = new Date()
        res.render('flights/index', {flights, title: 'All Flights', today})
    } catch (err) {
        res.send(err)
    }
}

function newFlight (req, res) {
    const flight = new Flight()
    const dt = flight.departs
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', {title: 'Add Flight', departsDate})
}

async function create (req, res) {
    try {
        const flight = new Flight(req.body)
        await flight.save()
        res.redirect('/flights')
    } catch (err) {
        res.redirect('/flights/new')
    }
}

async function show (req, res) {
    try {
        const flight = await Flight.findById(req.params.id)
        flight.destinations.sort((a, b) => +a.arrival - +b.arrival)
        const theAirports = ['ATL', 'DFW', 'DEN', 'LAX', 'SAN']
        let usedLocations = [flight.airport]
        flight.destinations.forEach(dest => usedLocations.push(dest.airport))
        const airports = theAirports.filter(airport => !usedLocations.includes(airport))
        const tickets = await Ticket.find({flight: flight._id})
        const dateTime = flight.departs.toISOString().slice(0, 16).split('T')
        res.render('flights/show', {title: 'Flight Details', flight, dateTime, airports, tickets})
    } catch (err) {
        res.send(err)
    }
}