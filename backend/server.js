// https://piyush-eon.medium.com/user-authentication-in-mern-stack-application-cbca694c7063
// run command: nodemon backend/server

// import functionalities from other .js files
const express = require("express"); // import express functionalities
const connectDB = require("./db");
const userRoutes = require("./userRoutes"); // define user routes

connectDB();
const app = express(); // start express application
app.use(express.json()); // accept JSON data from API requests

// GET Request from '/' route
app.get("/", (req, res) => {
    res.send("API is running..."); // send response
});

app.use("/api/user", userRoutes); // add user routes to server

PORT = 5000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}..`)); // listen for connection
