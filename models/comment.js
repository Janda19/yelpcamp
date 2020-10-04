var mongoose = require("mongoose"),
    user = require("./user"),

    commentSchema = mongoose.Schema({
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'user'
            },
            username: String
        },
        text: String
    }),


    comment = mongoose.model("comment", commentSchema);

module.exports = comment;
