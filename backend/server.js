// https://piyush-eon.medium.com/user-authentication-in-mern-stack-application-cbca694c7063
// run command: nodemon backend/server

const express = require("express"); // import express functionalities

const connectDB = require("./db");
connectDB();

const app = express(); // start express application

// GET Request to "/" route
app.get("/", (req, res) => {
    res.send("API is running..."); // send response
});

PORT = 5000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}..`)); // listen for connection
