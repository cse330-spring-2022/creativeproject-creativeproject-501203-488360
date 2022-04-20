const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("./userModel"); // import user model

const router = express.Router();

// post request to '/register' route (register new users)
router.post("/register", asyncHandler(async (req, res) => {
    // Node.js: access request body
    // posted object has 5 parameters
    const { loginID, forename, surname, password, isProf } = req.body;

    // a login ID matches: user exists (throw an error)
    const userExists = await User.findOne({ loginID });

    if (userExists) {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
        res.status(409); // conflict

        throw new Error("User Already Exists");
    }

    // create new user
    const newUser = await User.create({ loginID, forename, surname, password, isProf });

    if (newUser) { // if new User successfully created
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
        res.status(201).json({
            // https://mongoosejs.com/docs/guide.html#id
            _id: newUser._id,

            loginID: newUser.loginID,
            forename: newUser.forename,
            surname: newUser.surname,
            isProf: newUser.isProf
        }); // user created
    } else {
        res.status(400);
        throw new Error("Fail to create")
    }
}));

// '/login' route (login registered users)
router.post('/login', asyncHandler(async (req, res) => {
    
}));

module.exports = router;
