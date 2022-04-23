const express = require("express");
const asyncHandler = require("express-async-handler");
const { db } = require("./studentCourseModel");
const StudentCourse = require("./studentCourseModel");
const { route } = require("./userRoutes");
const router = express.Router();

// student add course sessions
router.post('/addStudentCourse', asyncHandler(async (req, res) => {
    const { stud, code, number, sessions, startTime } = req.body;

    const studExists = await db.collection("users").findOne({
        loginName: stud,
        isProf: false
    });
    if (!studExists) {
        res.json({
            success: false,
            info: "Not a valid student"
        });
        return;
    }

    // https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
    const courseExists = await db.collection("courses").findOne({
        code: code,
        number: number,
        sessions: sessions,
        startTime: startTime
    });
    if (!courseExists) {
        res.json({
            success: false,
            info: "Not a valid course"
        });
        return;
    }

    const sameCourse = await StudentCourse.findOne({ stud: stud, code: code, number: number });
    if (sameCourse) {
        res.json({
            success: false,
            info: "Course already registered"
        });
        return;
    }

    const addStudentCourse = await StudentCourse.create({
        student: stud,
        code: code,
        number: number,
        name: courseExists.name,
        prof: courseExists.prof,
        sessions: sessions,
        startTime: startTime,
        endTime: startTime+80
    });
    if (addStudentCourse) {
        res.json({
            success: true,
            object: addStudentCourse
        });
    } else {
        res.json({
            success: false,
            object: "Fail to add student course"
        });
        return;
    }
}));

// student delete course sessions
router.post('/deleteStudentCourse', asyncHandler(async (req, res) => {
    const { stud, code, number, sessions, startTime } = req.body;

    const deleteStudentCourse = await StudentCourse.deleteOne({
        student: stud,
        code: code,
        number: number,
        sessions: sessions,
        startTime: startTime
    });
    if (deleteStudentCourse) {
        res.json({
            success: true,
            object: deleteStudentCourse
        });
    } else {
        res.json({
            success: false,
            info: "Fail to delete student course"
        });
        return;
    }
}));

// get courses added by current student
router.get('/getCourseByStudent', (req, res) => {
    const { stud } = req.body;
    const courses = StudentCourse.find({ student: stud });
    res.json(courses);
});

module.exports = router;
