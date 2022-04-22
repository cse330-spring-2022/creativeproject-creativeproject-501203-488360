const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("./userModel"); // import user model
const router = express.Router();

// post request to '/register' route (register new users)
router.post("/register", asyncHandler(async (req, res) => {
    // Node.js: access request body
    // posted object has 3 parameters
    console.log("receiving register req");
    const { loginName, password, isProf } = req.body;

    // a login ID matches: user exists (throw an error)
    const userExists = await User.findOne({ loginName: loginName });
    if (userExists) {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
        res.status(409).json({
            success: false,
            info: "User already exists"
        }); // conflict
        return;
    }

    // create new user
    const newUser = await User.create({ loginName: loginName, password: password, isProf: isProf });

    if (newUser) { // if new User successfully created
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
        res.status(201).json({
            success: true,
            object: newUser
        }); // user created
    } else {
        res.status(400).json({
            success: false,
            info: "Fail to register"
        });
        return;
    }
}));

// '/login' route (login registered users)
router.post('/login', asyncHandler(async (req, res) => {
    console.log("receiving login req");
    const { loginName, password } = req.body;

    // a login ID matches: user exists (if not, throw an error)
    const user = await User.findOne({ loginName: loginName });
    if (!user) {
        res.status(404).json({
            success: false,
            info: "User not found"
        });
        return;
    }

    const matchPwd = await user.matchPassword(password);
    if (matchPwd) {
        res.status(200).json({
            success: true,
            object: user
        });
    } else {
        res.status(400).json({
            success: false,
            info: "Wrong password"
        });
        return;
    }
}));

module.exports = router;
