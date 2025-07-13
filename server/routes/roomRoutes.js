const {createRoom, getRooms} = require ('../contollers/roomController');
const express = require('express');
const router = express.Router();

router.post('/', createRoom);
router.get('/', getRooms);

module.exports = router;