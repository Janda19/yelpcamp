const mongoose = require("mongoose"),
    passportMongoose = require("passport-local-mongoose"),
    userSchema = mongoose.Schema({
        username: String,
        password: String
    });

userSchema.plugin(passportMongoose);
module.exports = mongoose.model('user', userSchema);

