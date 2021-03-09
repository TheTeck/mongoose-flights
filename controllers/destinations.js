const Flight = require('../models/flight')

module.exports = {
    create,
    delete: deleteDestination
}

async function create (req, res) {
    try {
        const flight = await Flight.findById(req.params.id)
        flight.destinations.push(req.body)
        await flight.save()
        res.redirect(`/flights/${flight._id}`)
    } catch (err) {
        res.send(err)
    }
}

async function deleteDestination (req, res) {
    try {
        const result = await Flight.findOne({'destinations._id': req.params.id})
        await result.destinations.id(req.params.id).remove()
        await result.save()
        res.redirect(`/flights/${result._id}`)
    } catch (err) {
        res.send(err)
    }
}