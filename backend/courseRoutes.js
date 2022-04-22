const express = require("express");
const asyncHandler = require("express-async-handler");
const { db } = require("./courseModel");
const Course = require("./courseModel"); // import user model
const router = express.Router();

// professor add course sessions
router.post('/addCourse', asyncHandler(async (req, res) => {
    const { prof, code, number, name, sessions, startTime } = req.body;

    const profExists = await db.collection("users").findOne({
        loginName: prof,
        isProf: true
    });
    if (!profExists) {
        res.status(404);
        throw new Error("Not a valid professor");
    }

    // prevent schedule self-conflict
    const conflict1 = await Course.findOne({
        prof: prof,
        sessions: sessions,
        $or: [{ startTime: startTime }, { startTime: startTime+30 }, { startTime: startTime+60 }]
    });
    if (conflict1) {
        res.status(409);
        throw new Error("Fail to create a course: schedule self-conflict");
    }

    // no two sessions of a course shall ever overlap (whether by the same professor or not)
    const conflict2 = await Course.findOne({
        code: code,
        number: number,
        sessions: sessions,
        $or: [{ startTime: startTime }, { startTime: startTime+30 }, { startTime: startTime+60 }]
    });
    if (conflict2) {
        res.status(409);
        throw new Error("Fail to create a course: sessions overlap");
    }

    const newCourse = await Course.create({
        prof: prof,
        code: code,
        number: number,
        name: name,
        sessions: sessions,
        startTime: startTime,
        endTime: startTime+80 // a course session lasts 80 minutes
    });
    if (newCourse) {
        res.status(201).json({
            _id: newCourse._id,
            prof: prof,
            code: code,
            number: number,
            name: name,
            sessions: sessions,
            startTime: startTime,
            endTime: startTime+80
        });
    } else {
        res.status(400);
        throw new Error("Fail to add course");
    }
}));

// professor delete course sessions
router.post('/deleteCourse', asyncHandler(async (req, res) => {
    const { prof, code, number, sessions, startTime } = req.body;
    
    // First, delete the course session from students' course registration sheets
    const deleteFromStud = await db.collection("student_courses").deleteMany({
        code: code,
        number: number,
        sessions: sessions,
        startTime: startTime
    });
    if (!deleteFromStud) {
        res.status(400);
        throw new Error("Fail to delete course from students");
    }

    // https://www.mongodb.com/docs/mongodb-shell/crud/delete/
    const deleteCourse = await Course.deleteOne({
        prof: prof,
        code: code,
        number: number,
        sessions: sessions,
        startTime: startTime
    });
    
    if (deleteCourse) {
        res.status(201).json({
            prof: prof,
            code: code,
            number: number,
            sessions: sessions,
            startTime: startTime
        });
    } else {
        res.status(400);
        throw new Error("Fail to delete course");
    }
}));

module.exports = router;
