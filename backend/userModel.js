const mongoose = require("mongoose");
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    loginID: {
        type: String,
        required: true,

        // https://masteringjs.io/tutorials/mongoose/unique
        unique: true
    },
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isProf: {
        type: Boolean,
        required: true
    }
});

// match (compare) password on login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// encrypt password everytime it's saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// https://www.geeksforgeeks.org/mongoose-mongoose-model-function/
const User = mongoose.model("users", userSchema); // user 'object' model based on schema

module.exports = User;
