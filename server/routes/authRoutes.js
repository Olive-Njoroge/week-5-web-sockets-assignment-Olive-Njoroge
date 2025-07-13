const express = require('express');
const router = express.Router();
const {registerUser} = require('../contollers/authController');

router.post("/register", registerUser)

module.exports = router;