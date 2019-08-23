const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comments');
const middleware = require('../middleware/index');
const Campground = require('../models/campgrounds');

router.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err) console.log(err);
        else res.render("comments/new", { camp: camp });
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        if (err) console.log(err);
        else {
            let newComment = { text: req.body.text };
            Comment.create(newComment, (err, comment) => {
                if (err) console.log(err);
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect(`/campgrounds/${camp._id}`)
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:cid/edit", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        Comment.findById(req.params.cid, (err, comment) => {
            res.render('comments/edit', { camp, comment, });
        });
    });
});

router.put("/campgrounds/:id/comments/:cid/", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, camp) => {
        const { text } = req.body;
        Comment.findByIdAndUpdate(req.params.cid, { text, }, (err, comment) => {
            if (err) console.log(err);
            else res.redirect(`/campgrounds/${req.params.id}`);
        });
    });
});

router.delete("/campgrounds/:id/comments/:cid", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndDelete(req.params.cid, (err, comment) => {
        if (err) console.log(err);
        else res.redirect(`/campgrounds/${req.params.id}`);
    });
});

module.exports = router
