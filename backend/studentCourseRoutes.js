const express = require("express");
const asyncHandler = require("express-async-handler");
const { db } = require("./studentCourseModel");
const StudentCourse = require("./studentCourseModel");
const router = express.Router();

// student add course sessions
router.post('/addStudentCourse', asyncHandler(async (req, res) => {
    const { stud, code, number, profID, sessions, startTime } = req.body;

    const studExists = await db.collection("users").findOne({
        loginName: stud,
        isProf: false
    });
    if (!studExists) {
        res.status(404);
        throw new Error("Not a valid student");
    }

    
}));

// student delete course sessions
router.post('/deleteStudentCourse', asyncHandler(async (req, res) => {
    
}));

module.exports = router;
