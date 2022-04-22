const express = require("express");
const asyncHandler = require("express-async-handler");
const { db } = require("./studentCourseModel");
const StudentCourse = require("./studentCourseModel");
const router = express.Router();

// student add course sessions
router.post('/addStudentCourse', asyncHandler(async (req, res) => {
    const { stud, code, number, sessions, startTime } = req.body;

    const studExists = await db.collection("users").findOne({
        loginName: stud,
        isProf: false
    });
    if (!studExists) {
        res.status(404);
        throw new Error("Not a valid student");
    }

    // https://stackoverflow.com/questions/7033331/how-to-use-mongoose-findone
    const courseExists = await db.collection("courses").findOne({
        code: code,
        number: number,
        sessions: sessions,
        startTime: startTime
    });
    if (!courseExists) {
        res.status(404);
        throw new Error("Not a valid course");
    }

    const sameCourse = await StudentCourse.findOne({ stud: stud, code: code, number: number });
    if (sameCourse) {
        res.status(409);
        throw new Error("Course already registered");
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
        res.status(201).json({
            student: stud,
            code: code,
            number: number,
            sessions: sessions,
            startTime: startTime
        });
    } else {
        res.status(400);
        throw new Error("Fail to add student course");
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
        res.status(200).json({
            student: stud,
            code: code,
            number: number,
            sessions: sessions,
            startTime: startTime
        });
    } else {
        res.status(400);
        throw new Error("Fail to delete student course");
    }
}));

module.exports = router;
