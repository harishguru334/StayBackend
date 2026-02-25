const Room = require("../Mdule/RoomModule");

const DEFAULT_TARIFF = {
  STD: 2000,
  DLX: 2800,
  SD: 3200
};

/**
 * ADD ROOM
 */
const addRoom = async (req, res) => {
  try {
    const { hotelId, floor, roomNo, type, price, status } = req.body;

    if (!hotelId || !floor || !roomNo || !type) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const room = await Room.create({
      hotelId: hotelId.trim(),
      floor,
      roomNo,
      type,
      price: price || DEFAULT_TARIFF[type],
      status
    });

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room
    });

  } catch (err) {

    // Duplicate room handle
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Room already exists in this hotel"
      });
    }

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/**
 * GET ROOMS BY HOTEL
 */
const getRooms = async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "HotelId is required"
      });
    }

    const rooms = await Room.find({ hotelId: hotelId.trim() })
      .sort({ floor: 1, roomNo: 1 });

    res.status(200).json({
      success: true,
      rooms
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { addRoom, getRooms };