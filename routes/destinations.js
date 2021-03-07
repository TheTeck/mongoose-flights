const express = require('express')
const router = express.Router()
const destinationsCtlr = require('../controllers/destinations')

router.post('/flights/:id/destinations', destinationsCtlr.create)

module.exports = router
