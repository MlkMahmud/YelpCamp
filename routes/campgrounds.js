const Campground = require('../models/campgrounds'),
      Comment    = require('../models/comments'),
      express    = require('express'),
      flash      = require('connect-flash'),
      middleware = require('../middleware/index');
      router     = express.Router({mergeParams: true});
function timer(){
    let fftime = new Date().getHours() + ':' + new Date().getMinutes();
    return fftime;
}
 

router.get('/', function(req, res){
    res.render('campgrounds/landing')
})

router.get('/campgrounds', middleware.isLoggedIn, function(req, res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("No")
        }
        else{
        res.render('campgrounds/campgrounds', {campgrounds: campgrounds})
        }
    })
    
});

router.post("/campgrounds", function(req, res){
    let name = req.body.name,
        image = req.body.image,
        author = {id: req.user._id, username: req.user.username},
        price = req.body.price,
        desc = req.body.desc;
    let newCamp = {name: name, image: image, description: desc, author: author, price: price}
    Campground.create(newCamp, function(err, campgrounds){
        if(err){
            console.log("Error")
        }
        else{
            res.redirect("/campgrounds")
        }
    });
    
});

router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
});

router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/show", {camp: camp, date: timer()}) 
        }
    })
})

router.get("/campgrounds/:id/edit",middleware.checkOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.render('campgrounds/edit', {camp: camp})
        }
    })
})

router.put('/campgrounds/:id',middleware.checkOwnership, function(req, res){
    let name = req.body.name,
        image = req.body.image,
        price = req.body.price,
        description = req.body.desc,
    updatedCamp = {name: name, image: image, description: description, price: price};
    Campground.findByIdAndUpdate(req.params.id, updatedCamp, function(err, camp){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.redirect(`/campgrounds/${req.params.id}`)
        }
    })   
})

router.delete("/campgrounds/:id",middleware.checkOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, camp){
        if(err){
            res.redirect(`/campgrounds/${req.params.id}`)
        }
        else{
            res.redirect("/campgrounds")
        }
    })
})





module.exports = router;
