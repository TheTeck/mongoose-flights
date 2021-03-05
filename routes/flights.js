const express = require('express');
const router = express.Router();
const flightCtrl = require('../controllers/flights')

router.get('/', flightCtrl.index)
router.get('/new', flightCtrl.new)

module.exports = router;
