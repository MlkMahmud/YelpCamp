const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      Campground    = require('./models/campgrounds.js'),
      Comment       = require("./models/comments"),
      User          = require("./models/user"),
      passport      = require("passport"),
      passportLocal = require("passport-local"),
      seedDB        = require("./seeds"),
      session       = require("express-session"),
      methodOverride= require('method-override'),
      campRoutes    = require('./routes/campgrounds'),
      indexRoutes   = require('./routes/index'),
      flash         = require('connect-flash'),
      commentRoutes = require('./routes/comments'),
      mongoose      = require('mongoose');


mongoose.connect(process.env.DATABASE);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//PASSPORT SETUP
app.use(session({
    secret: "Random Text",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.error       = req.flash('error');
    res.locals.success     = req.flash('success');
    res.locals.currentUser = req.user;
    next()
});

app.use(campRoutes);
app.use(indexRoutes);
app.use(commentRoutes);


app.get('*', function(req, res){
    res.send('You miss road?')
})

app.listen(100, function(){
    console.log('WE UP!!')
});

