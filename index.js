require('dotenv').config()
const express = require('express') 
const app = express()
const port = 3000


app.get('/room', (req, res) =>{
    res.send('hello')
})

app.listen(process.env.PORT, () => {
    console.log("server is running")
})