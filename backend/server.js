
const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const complaintRoutes = require('./routes/Routes')
const cors = require('cors');
const app=express()

app.use(cors());

// ✅ If you want to allow only your frontend (More secure)
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);




//midleware
app.use(express.json())

app.use((req,res,next)=>{
console.log(req.path,req.method)
next()

})



//routes
app.use('/api',complaintRoutes)

//connect db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('its connected to db')

    //listen for requests
app.listen(process.env.PORT, ()=>{
    console.log('conncetd and listening on port 4000')
})
})
.catch(()=>{
    console.log(error)
})


