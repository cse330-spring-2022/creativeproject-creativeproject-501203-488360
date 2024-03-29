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
        res.json({
            success: false,
            info: "Not a valid professor"
        });
        return;
    }

    // prevent schedule self-conflict
    const conflict1 = await Course.findOne({
        prof: prof,
        sessions: sessions,
        $or: [{ startTime: startTime }, { startTime: startTime-30 }, { startTime: startTime-60 }]
    });
    if (conflict1) {
        res.json({
            success: false,
            info: "Fail to create a course: schedule self-conflict"
        });
        return;
    }

    // no two sessions of a course shall ever overlap (whether by the same professor or not)
    const conflict2 = await Course.findOne({
        code: code,
        number: number,
        sessions: sessions,
        $or: [{ startTime: startTime }, { startTime: startTime-30 }, { startTime: startTime-60 }]
    });
    if (conflict2) {
        res.json({
            success: false,
            info: "Fail to create a course: sessions overlap"
        });
        return;
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
        res.json({
            success: true,
            object: newCourse
        });
    } else {
        res.json({
            success: false,
            info: "Fail to add course"
        });
        return;
    }
}));

// professor delete course sessions
router.post('/deleteCourse', asyncHandler(async (req, res) => {
    const { prof, name, code, number, sessions, startTime } = req.body;
    
    // First, delete the course session from students' course registration sheets
    const deleteFromStud = await db.collection("student_courses").deleteMany({
        // code: code,
        // number: number,
        // sessions: sessions,
        // startTime: startTime
        name: name
    });
    if (!deleteFromStud) {
        res.json({
            success: false,
            info: "Fail to delete course from students"
        });
        return;
    }

    // https://www.mongodb.com/docs/mongodb-shell/crud/delete/
    const deleteCourse = await Course.deleteOne({
        // prof: prof,
        // code: code,
        // number: number,
        // sessions: sessions,
        // startTime: startTime
        name: name
    });
    
    if (deleteCourse) {
        res.json({
            success: true,
            object: deleteCourse
        });
    } else {
        res.json({
            success: false,
            info: "Fail to delete course"
        });
        return;
    }
}));

// get complete list of courses (not ordered)
router.post('/getCourse', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

// get list of courses add by current (logged-in) professor
router.post('/getCourseByProf', async (req, res) => {
    const { professor } = req.body;
    const courses = await Course.find({ prof: professor });
    res.json(courses);
});

// get course by name
router.post('/getCourseByName', async (req, res) => {
    const { name } = req.body;
    const courses = await Course.find({ name: name });
    res.json(courses);
});

module.exports = router;
