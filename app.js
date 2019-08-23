'use strict';

const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const methodOverride = require('method-override');
const User = require('./models/user');
const campRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');
const commentRoutes = require('./routes/comments');

const app = express();

mongoose.connect('mongodb://localhost/yelp_camp3');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//PASSPORT SETUP
app.use(
  session({
    secret: 'Random Text',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.currentUser = req.user;
  next();
});

app.use(campRoutes);
app.use(indexRoutes);
app.use(commentRoutes);

app.get('*', (req, res) => {
  res.send('You miss road?');
});

app.listen(3000, () => {
  console.log('RUNNING!!');
});
