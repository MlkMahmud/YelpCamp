const Campground = require('../models/campgrounds'),
      Comment    = require('../models/comments');

middlewareObj = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error", 'Please Sign In.');
        res.redirect("/login")
    },
    checkOwnership: function(req, res, next){
        if(req.isAuthenticated){    
            Campground.findById(req.params.id, function(err, camp){
                if(camp.author.id.equals(req.user._id)){
                    return next()
                }
                else{
                    res.redirect("back")

                    
                }
            })
        }
        else{
            res.redirect("back")
        }
    },
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated){    
            Comment.findById(req.params.cid, function(err, comment){
                if(comment.author.id.equals(req.user._id)){
                    return next()
                }
                else{
                    res.redirect("back")
                    
                }
            })
        }
        else{
            res.redirect("back")
        }
    }
}

module.exports = middlewareObj;