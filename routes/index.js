const express = require("express"),
    router = express.Router(),
    user = require("../models/user"),
    passport = require("passport");
router.get("/login", function (req, res) {
    res.render("login");
});

router.get("/register", function (req, res) {
    res.render("register");
});

router.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "you logged out ");
    res.redirect("/campgrounds");
});

router.post("/register", function (req, res) {
    user.register(new user({username: req.body.username}), req.body.password, function (err, user) {
        if (err) {
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});
router.post("/login", passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;