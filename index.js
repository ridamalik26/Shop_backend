//import the express module
const express = require('express');

//Define the port number the server will listen on
const PORT = 2000;

//create an instance of an express application
//because it give us the starting point

const app = express();

app.get("/hello",(req, res)=>{
    res.send('Hello world');
});

//start the server and listen on the specified port
app.listen(PORT,"0.0.0.0", function(){
    //Log the number
    console.log(`Server is running on port ${PORT}`);
});