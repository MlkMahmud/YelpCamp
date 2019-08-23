'use strict'

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport= require('passport'); 

router.get("/register", (req, res) => {
    res.render("campgrounds/register");
});

router.post("/register", (req, res, next) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            req.flash('error', err.message)
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, () => {
            next()
            
        });
    });
}, (req, res) => {
    req.flash('success', 'Welcome' + ' ' + req.body.username);
    res.redirect("/campgrounds")
});

router.get("/login", (req, res) => {
    res.render("campgrounds/login")  
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', `Welcome Back ${req.body.username}`);
    res.redirect('/campgrounds');
    });


router.get("/logout", (req, res) => {
    req.flash('success', 'Farewell' + ' ' + req.user.username);
    req.logOut();
    res.redirect("/login");
});

module.exports = router;
