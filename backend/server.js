// https://piyush-eon.medium.com/user-authentication-in-mern-stack-application-cbca694c7063
// run command: nodemon backend/server

// import routes & functionalities
const express = require("express"); // import express functionalities
const connectDB = require("./db"); // import MongoDB functionalities
const userRoutes = require("./userRoutes"); // import user route
const courseRoutes = require("./courseRoutes");
const studentCourseRoutes = require("./studentCourseRoutes");

connectDB();
const app = express(); // start express application
app.use(express.json()); // accept JSON data from API requests

// GET Request from '/' route
app.get("/", (req, res) => {
    res.send("API is running..."); // send response
});

// app.use(): set routes
app.use("/api/user", userRoutes); // set user route
app.use("/api/course", courseRoutes);
app.use("/api/studentCourse", studentCourseRoutes);

PORT = 5000;
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`)); // listen for connection
