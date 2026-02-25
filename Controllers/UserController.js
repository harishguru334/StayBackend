const User = require("../Mdule/UserModule")

/**
 * SIGNUP
 * First user of hotel = admin
 * Others = staff
 */
const signup = async (req, res) => {
  try {
    const { hotelId, username, password } = req.body;

    if (!hotelId || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔍 check: is hotel ke liye koi user already hai?
    const existingUser = await User.findOne({ hotelId });

    // 👉 agar pehla user hai → admin
    const role = existingUser ? "staff" : "admin";

    const newUser = await User.create({
      hotelId,
      username,
      password,
      role
    });

    res.status(201).json({
      success: true,
      message:
        role === "admin"
          ? "Admin account created"
          : "Staff account created",
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/**
 * LOGIN
 */
const login = async (req, res) => {
  try {
    const { hotelId, username, password } = req.body;

    const user = await User.findOne({ hotelId, username });

    if (!user || user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        hotelId: hotelId,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { signup, login };
