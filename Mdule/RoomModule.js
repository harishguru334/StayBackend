const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  roomNo: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["STD", "DLX", "SD"],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["ready", "occupied", "blocked", "dirty"],
    default: "ready"
  }
});

// 🔥 Duplicate permanently stop karega
roomSchema.index({ hotelId: 1, roomNo: 1 }, { unique: true });

module.exports = mongoose.model("Room", roomSchema);
