const express = require('express')
const router = express.Router()
const ticketsCtlr = require('../controllers/tickets')

router.get('/flights/:id/tickets/new', ticketsCtlr.new)
router.post('/flights/:id/tickets', ticketsCtlr.create)
router.delete('/tickets/:id', ticketsCtlr.delete)

module.exports = router