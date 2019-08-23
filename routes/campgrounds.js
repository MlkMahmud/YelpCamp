'use strict'

const Campground = require('../models/campgrounds');
const Comment    = require('../models/comments');
const express    = require('express');
const flash      = require('connect-flash');
const middleware = require('../middleware/index');
const router = express.Router({ mergeParams: true });
      
function timer(){
    let fftime = new Date().getHours() + ':' + new Date().getMinutes();
    return fftime;
}
 
router.get('/', (req, res) => {
    res.render('campgrounds/landing');
});

router.get('/campgrounds', middleware.isLoggedIn, (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) console.log("No");
        else res.render('campgrounds/campgrounds', { campgrounds: campgrounds });
    });   
});

router.post("/campgrounds", (req, res) => {
    const { name, image, price, desc } = req.body;
    const author = { id: req.user._id, username: req.user.username };
    const newCamp = {name, image, description: desc, author, price, }
    Campground.create(newCamp, (err, campgrounds) => {
        if (err) console.log("Error");
        else res.redirect("/campgrounds");
    });
});

router.get("/campgrounds/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});


router.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, camp) => {
        if (err) console.log(err);
        else res.render("campgrounds/show", { camp, date: timer() });
    });
});

router.get("/campgrounds/:id/edit", middleware.checkOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err) res.redirect("/campgrounds");
        else res.render('campgrounds/edit', { camp, });
    });
});

router.put('/campgrounds/:id', middleware.checkOwnership, (req, res) => {
    const { name, image, price, desc: description } = req.body;
    const updatedCamp = { name, image, description, price, };
    Campground.findByIdAndUpdate(req.params.id, updatedCamp, (err, camp) => {
        if (err) res.redirect("/campgrounds");
        else res.redirect(`/campgrounds/${req.params.id}`);
    });
});

router.delete("/campgrounds/:id", middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, camp) => {
        if (err) res.redirect(`/campgrounds/${req.params.id}`);
        else res.redirect("/campgrounds");
    });
});





module.exports = router;
