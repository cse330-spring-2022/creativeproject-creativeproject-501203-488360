const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    prof: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sessions: { // Mon-Wed or Tue-Thu
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
