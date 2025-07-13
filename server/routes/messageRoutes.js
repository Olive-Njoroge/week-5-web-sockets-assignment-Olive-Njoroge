const express = require('express');
const router = express.Router();

const {getRoomMessages} = require('../contollers/messageControllerr');

router.get('/:roomId', getRoomMessages);

module.exports = router;