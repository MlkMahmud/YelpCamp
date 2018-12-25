const mongoose   = require("mongoose"),
      Campground = require("./models/campgrounds"),
      Comment    = require("./models/comments");

let camps = [
    {
        name: "Obudu Cattle Ranch",
        image: "https://bit.ly/2L4iNHu",
        description: "Obudu Mountain Resort Currently Managed by ZEDICI CAPITAL LIMITED is a ranch and resort on the Obudu Plateau in Cross River State, Nigeria. It was developed in 1951 by M. McCaughley, a Scot who first explored the mountain ranges in 1949."
    },
    {
        name: "Tarkwa Bay",
        image: "https://bit.ly/2G9OaSi",
        description: "Tarkwa Bay is an artificial sheltered beach located near the Lagos harbour in Nigeria. Due to its island status, it is only accessible by boat or water taxis. The beach, popular with swimmers and water-sports enthusiasts, also has a welcoming resident community."
    },
    {
        name: "Tinapa Resorts",
        image:"https://bit.ly/2G9UyZX",
        description: "This place is really nice. The lake side is the most beautiful one, much nicer than the one of the marina. The staff is great. The area is beautiful. The food is good."
    }
]

function seedDB(){
    console.log('YEAH')
;}

module.exports = seedDB;