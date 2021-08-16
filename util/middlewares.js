const campModel = require('../models/campModel');
const reviewModel = require('../models/reviewModel');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', "Please login to proceed!");
        return res.redirect('/login');
    }
    next();
}

module.exports.checkCampPermission = async (req, res, next) => {
    let campground = await campModel.findById(req.params.id)
    if(!campground.author.equals(req.user._id)){
        req.flash('error', "You dont have enough permission!");
        return res.redirect(`/camp${req.params.id}`);
    }
    next();
}

module.exports.checkReviewPermission = async (req, res, next) => {
    let review = await reviewModel.findById(req.params.id)
    if(!review.author.equals(req.user._id)){
        req.flash('error', "You dont have enough permission!");
        return res.redirect(`/camp/${req.params.campId}`);
    }
    next();
}