const express = require('express')
const router = express.Router()
const { getPrivateData } = require('../controllers/private-controller.js')
const { protect } = require('../middleware/protected-auth.js')

//router.get('/', protect, getPrivateData)
router.route('/').get(protect, getPrivateData)

module.exports = router
