const express    = require('express'),
      router     = express.Router({mergeParams: true}),
      Comment    = require('../models/comments'),
      middleware = require('../middleware/index'),
      Campground = require('../models/campgrounds');

router.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {camp: camp})
        }
    })
})

router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            console.log(err)
        }else{
            let newComment = {text: req.body.text};
            Comment.create(newComment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect(`/campgrounds/${camp._id}`)
                }
            })
        }
    })
})

router.get("/campgrounds/:id/comments/:cid/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        Comment.findById(req.params.cid, function(err, comment){
            res.render('comments/edit', {camp: camp, comment: comment})
        } )
    })
})

router.put("/campgrounds/:id/comments/:cid/",middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        let text = req.body.text
        Comment.findByIdAndUpdate(req.params.cid, {text: text}, function(err, comment){
            if(err){
                console.log(err)
            }
            else{
                res.redirect(`/campgrounds/${req.params.id}`)
            }
        })
    })
})

router.delete("/campgrounds/:id/comments/:cid",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.cid, function(err, comment){
        if(err){
            console.log(err)
        }else{
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
})

module.exports = router