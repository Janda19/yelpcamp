const mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    discription: String,
    comment: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "comment"
    }],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectID,
            ref: "user"
        },
        username: String
    },
    date: {type: Date, default: Date.now()}
});
var campground = mongoose.model("campground", campgroundSchema);

module.exports = campground;