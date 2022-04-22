const mongoose = require("mongoose");

const studentCourseSchema = mongoose.Schema({
    student: {
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
    prof: {
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

const StudentCourse = mongoose.model("student_courses", studentCourseSchema);
module.exports = StudentCourse;
