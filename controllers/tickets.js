const Ticket = require('../models/ticket')

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
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

function deleteTicket (req, res) {
    Ticket.findById(req.params.id, function (err, ticket) {
        const flight = ticket.flight[0]
        Ticket.findByIdAndDelete(req.params.id, function (err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })        
}