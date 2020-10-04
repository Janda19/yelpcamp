const campground = require("../models/campground"),
    comment = require("../models/comment");
var middleware = {};

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    /*****************/
    req.flash("error", "you need to login");
    res.redirect("/login");
};
middleware.checkOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.id, function (err, found) {
            if (found.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
        });

    } else {
        res.redirect("back");
    }
};
middleware.campgroundCheckOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        campground.findById(req.params.id, function (err, foundCampground) {
            if (foundCampground.user.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
        });

    } else {
        res.redirect("back");
    }
}

module.exports = middleware;