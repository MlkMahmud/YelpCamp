const express = require('express'),
      router  = express.Router(),
      User    = require('../models/user'),
      passport= require('passport'); 

router.get("/register", function(req, res){
    res.render("campgrounds/register")
    
})

router.post("/register", function(req, res, next){
    newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            req.flash('error', err.message)
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res, function(){
            next()
            
        })
    }) 
}, function(req, res){
    req.flash('success', 'Welcome' + ' ' + req.body.username);
  
    res.redirect("/campgrounds")
    
})

router.get("/login", function(req, res){
    res.render("campgrounds/login")
    
    
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), function(req, res){
    req.flash('success', `Welcome Back ${req.body.username}`)
    res.redirect('/campgrounds');
    });




router.get("/logout", function(req, res){
    req.flash('success', 'Farewell' + ' ' + req.user.username)
    req.logOut();
    res.redirect("/login")
});

module.exports = router;