//import the express module
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
//Define the port number the server will listen on
const PORT = 2000;

//create an instance of an express application
//because it give us the starting point

const app = express();
// mongodb string
const DB = "mongodb+srv://malikrida406:BXpc6GlweqvJCDXU@cluster0.btmmmqd.mongodb.net/?appName=Cluster0"
//middleware - to register routes or to mount routes

app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);

mongoose.connect(DB).then(()=>{
    console.log('Mongodb Connected');
});

//start the server and listen on the specified port
app.listen(PORT,"0.0.0.0", function(){
    //Log the number
    console.log(`Server is running on port ${PORT}`);
});