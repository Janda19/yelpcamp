const express = require("express"),
    router = express.Router({mergeParams: true}),
    comment = require("../models/comment"),
    campground = require("../models/campground"),
    middleware=require("../middleware");
//
// router.post("/campgrounds/:id/comments", function (req, res) {
//     comment.create(req.body.comment, function (err, newComment) {
//         if (err) {
//             console.log("cannot create the comment", err);
//         } else {
//             campground.findById(req.params.id, function (err, foundCampground) {
//                 if (err) {
//                     res.redirect("/campgrounds/" + foundCampground._id);
//                 } else {
//                     newComment.author.username = req.user.username;
//                     newComment.author.id = req.user._id;
//                     foundCampground.comment.push(newComment);
//                     foundCampground.save();
//                     res.redirect("/campgrounds/" + foundCampground._id);
//
//                 }
//             });
//         }
//     });
// });


router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (req, res) {
    campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds/" + foundCampground._id);
        } else {
            comment.create(req.body.comment, function (err, newComment) {
                if (err) {
                    res.redirect("/campgrounds/" + foundCampground._id);

                } else {

                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundCampground.comment.push(newComment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});
router.delete("/campgrounds/:id/comment", middleware.checkOwnership, function (req, res) {
    comment.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("back");
        }
    });
});
router.put("/campgrounds/:id/comment", middleware.checkOwnership, function (req, res) {
    comment.findByIdAndUpdate(req.params.id, req.body.comment, function (err, found) {
        if (err) {
            res.redirect("back");
        } else {

            res.redirect("back");

        }
    });
});





module.exports = router;