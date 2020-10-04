var mongoose = require("mongoose");
var campground = require("./models/campground");
var campgrounds = [
    {
        name: "borj cedria",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        discription: "greatest plaace on earth!! you gotta visit it !"
    },
    {
        name: "Cap Zbib",
        image: "https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602",
        discription: " one of the greatest places in tunisia"
    },
    {
        name: "Cap Negro",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwBwg1ltelHOMsC4TZpc-fDt2-lHYK7v2ivg&usqp=CAU",
        discription: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem consectetur culpa cupiditate dolorum exercitationem facere fuga illum ipsum itaque magnam minus nemo, nobis, perferendis, quas quasi repellat unde voluptate."
    },
];

function seedDB() {
    campground.deleteMany({}, function (err) {
        if (err) {

        } else {
            console.log("campgrounds are removed");
            campground.create(campgrounds, function (err, campgrounds) {
                if (err) {

                    console.log("camp NOT created");
                } else {
                    console.log("camp created");
                }
            });
        }
    });
}

module.exports = seedDB;