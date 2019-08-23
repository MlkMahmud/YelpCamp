'use strict'

const Campground = require('../models/campgrounds');
const Comment = require('../models/comments');

const middlewareObj = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error", 'Please Sign In.');
        res.redirect("/login")
    },

    checkOwnership(req, res, next){
        if (req.isAuthenticated) {
            Campground.findById(req.params.id, (err, camp) => {
                if (camp.author.id.equals(req.user._id)) return next();
                else res.redirect("back");
            });
        }
        else res.redirect("back")
    },

    checkCommentOwnership(req, res, next){
        if (req.isAuthenticated) {
            Comment.findById(req.params.cid, (err, comment) => {
                if (comment.author.id.equals(req.user._id)) {
                    return next()
                }
                else res.redirect("back");
            });
        }
        else res.redirect("back");
    }
}

module.exports = middlewareObj;
