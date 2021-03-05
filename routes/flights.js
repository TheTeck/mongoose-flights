const express = require('express');
const router = express.Router();
const flightCtrl = require('../controllers/flights')

router.get('/', flightCtrl.index)

module.exports = router;
