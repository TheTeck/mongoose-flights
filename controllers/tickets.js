const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create
}

function newTicket (req, res) {
    res.render('tickets/new', {title: 'New Ticket', id: req.params.id})
}

function create (req, res) {
    const ticket = new Ticket(req.body)
    ticket.flight[0] = req.params.id

    ticket.save(function(err) {
        res.redirect(`/flights/${req.params.id}`)
    })
}