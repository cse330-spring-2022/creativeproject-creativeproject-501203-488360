const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    loginName: {
        type: String,
        required: true,

        // https://masteringjs.io/tutorials/mongoose/unique
        unique: true
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

// https://piyush-eon.medium.com/user-authentication-in-mern-stack-application-cbca694c7063
// match (compare) password on login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// https://piyush-eon.medium.com/user-authentication-in-mern-stack-application-cbca694c7063
// Middleware: encrypt password everytime it's saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { next(); }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// https://www.geeksforgeeks.org/mongoose-mongoose-model-function/
const User = mongoose.model("users", userSchema);

module.exports = User;
