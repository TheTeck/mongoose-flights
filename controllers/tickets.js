const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}

function newTicket (req, res) {
    res.render('tickets/new', {title: 'New Ticket', id: req.params.id})
}

async function create (req, res) {
    const ticket = new Ticket(req.body)
    ticket.flight = req.params.id

    try {
        await ticket.save()
        res.redirect(`/flights/${req.params.id}`)
    } catch (err) {
        res.send(err)
    }
}

async function deleteTicket (req, res) {
    try {
        const ticket = await Ticket.findById(req.params.id)
        const flight = ticket.flight
        await Ticket.findOneAndDelete(req.params.id)
        res.redirect(`/flights/${flight._id}`)
    } catch (err){
        res.send(err)
    }   
}