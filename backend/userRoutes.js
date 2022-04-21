const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("./userModel"); // import user model
const router = express.Router();

// post request to '/register' route (register new users)
router.post("/register", asyncHandler(async (req, res) => {
    // Node.js: access request body
    // posted object has 3 parameters
    const { loginName, password, isProf } = req.body;

    // a login ID matches: user exists (throw an error)
    const userExists = await User.findOne({ loginName });
    if (userExists) {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
        res.status(409); // conflict

        throw new Error("User already exists");
    }

    // create new user
    const newUser = await User.create({ loginName, password, isProf });

    if (newUser) { // if new User successfully created
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
        res.status(201).json({
            // https://mongoosejs.com/docs/guide.html#id
            _id: newUser._id, // secret ID

            loginName: newUser.loginName,
            isProf: newUser.isProf
        }); // user created
    } else {
        res.status(400);
        throw new Error("Fail to register");
    }
}));

// '/login' route (login registered users)
router.post('/login', asyncHandler(async (req, res) => {
    const { loginName, password } = req.body;

    // a login ID matches: user exists (if not, throw an error)
    const user = await User.findOne({ loginName });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const matchPwd = await user.matchPassword(password);
    if (matchPwd) {
        res.status(200).json({
            _id: user._id,
            loginName: user.loginName,
            password: user.password
        });
    } else {
        res.status(400);
        throw new Error("Wrong password");
    }
}));

module.exports = router;
