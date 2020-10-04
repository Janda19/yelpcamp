const express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    seedDB = require("./seed"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportMongoose = require("passport-local-mongoose"),
    user = require("./models/user"),

    flash = require("connect-flash");


app.use(flash());

// seedDB();


app.use(require('express-session')({
    secret: 'mila is the best do in the world',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.currentUser = req.user;
    next();
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

mongoose.connect(process.env.DATABASEURL||"mongodb://localhost/yelpcamp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const campground = require("./routes/campground"),
    comments = require("./routes/comment"),
    index = require("./routes/index");

app.use(campground);
app.use(comments);
app.use(index);

var port = process.env.PORT || 4444;
app.listen(port);