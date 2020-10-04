const express = require("express"),
    router = express.Router(),
    campground = require("../models/campground"),
    middleware = require("../middleware");
router.get("/", function (req, res) {
    res.render("home");
});
router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
    res.render("new");
});
router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    campground.create(req.body.campground, function (err, newCampground) {
        if (err) {
            req.flash("error", "the post has not been created");

            res.redirect("/campgrounds/new");

        } else {
            newCampground.user.id = req.user.id;
            newCampground.user.username = req.user.username;
            newCampground.save();
            req.flash("success", "the post has been created");
            res.redirect('/campgrounds');
        }
    });

});

router.get("/campgrounds", function (req, res) {
    campground.find({}, function (err, foundList) {
        if (err) {
            console.log("index file prob", err);
        } else {
            res.render("index", {campground: foundList});
        }
    });
});

router.get("/campgrounds/:id", function (req, res) {
    campground.findById(req.params.id).populate("comment").exec(function (err, found) {
        if (err) {
            res.redirect('/');
        } else {
            res.render("show", {campground: found});
        }
    });
});

router.put('/campgrounds/:id', middleware.campgroundCheckOwnership, function (req, res) {

    campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updated) {
        if (err) {
            req.flash("error", "something went wrong");

            res.redirect("/campgrounds/" + updated._id);
        } else {
            req.flash("error", "the post has been modified");
            res.redirect("/campgrounds/" + updated._id);
        }
    });

});
router.get("/campgrounds/:id/edit", middleware.campgroundCheckOwnership, function (req, res) {


    campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {

            res.render("edit", {campground: foundCampground});
        }
    });
});
router.delete("/campgrounds/:id", middleware.campgroundCheckOwnership, function (req, res) {
    campground.findByIdAndDelete(req.params.id, function (err) {
        req.flash("error", 'campground deleted !');
        res.redirect("/campgrounds");
    })
});


module.exports = router;