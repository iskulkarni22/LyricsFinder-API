const express = require('express')
const router = express.Router()
const geniusController = require('../controllers/geniusApiReqController')


router.route('/')
    .get(geniusController.getGeniusSong)

module.exports = router