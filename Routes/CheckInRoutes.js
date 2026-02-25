const express = require("express");
const router = express.Router();
const { createCheckIn } = require("../Controllers/CheckInController");

router.post("/create", createCheckIn);

module.exports = router;