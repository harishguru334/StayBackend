const express = require("express");
const router = express.Router();

const { addRoom , getRooms } = require("../Controllers/RoomController");

router.post("/add", addRoom);
router.get("/Rooms/:hotelId" , getRooms)

module.exports = router;
