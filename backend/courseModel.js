const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    profID: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sessions: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    }
});

const Course = mongoose.model("courses", courseSchema);
module.exports = Course;
