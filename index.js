require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express') 
const cors = require("cors");



const app = express()
const userRoutes = require('./routes/userRoutes')
const RoomRoutes = require("./routes/RoomRoutes")
const checkInRoutes = require("./routes/checkInRoutes");


app.use(cors()); // 🔥 IMPORTANT
app.use(express.json())

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ MongoDB Atlas Connected")
    } catch (err) {
        console.error("❌ MongoDB Error:", err)
    }
}
main()


app.use("/api/user", userRoutes);
app.use("/api/Room", RoomRoutes);
app.use("/api/checkin", checkInRoutes);


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("server is running")
})