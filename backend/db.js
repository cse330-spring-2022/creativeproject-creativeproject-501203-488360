// https://piyush-eon.medium.com/user-authentication-in-mern-stack-application-cbca694c7063

const mongoose = require("mongoose");

// function to connect to database
const connectDB = async () => {
    MONGO_URI = "mongodb+srv://tngok:19991109@courseregsheet.s9pen.mongodb.net/course_reg_sheet?retryWrites=true&w=majority";
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;
