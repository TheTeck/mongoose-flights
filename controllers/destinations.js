const Flight = require('../models/flight')

module.exports = {
    create,
    delete: deleteDestination
}

function create (req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        flight.destinations.push(req.body)
        flight.save(function (err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}

function deleteDestination (req, res) {
    Flight.findOne({'destinations._id': req.params.id}, function (err, result) {
        result.destinations.id(req.params.id).remove()
        result.save(function (err) {
            res.redirect(`/flights/${result._id}`)
        })
    })
}