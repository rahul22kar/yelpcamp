const reviewModel = require('../models/reviewModel');
const campModel = require('../models/campModel');

module.exports.createNewReview = async (req, res, next) => {
    const { id } = req.params;
    const {review} = req.body;
    const exists = await reviewModel.find({author: req.user._id});
    if (exists.length) {
        req.flash('error', "You can only submit one review!");
        return res.redirect(`/camp/${id}`);
    }
    const newReview = new reviewModel(review);
    let campground = await campModel.findById(id);
    newReview.author = req.user._id;
    await newReview.save();
    await campground.reviews.push(newReview);
    await campground.save();
    req.flash('success', "Review created successfully!");
    res.redirect(`/camp/${id}`);
}

module.exports.deleteReview = async(req, res, next) => {
    const { id, campId } = req.params;
    let campground = await campModel.findById(campId);
    campground.reviews = campground.reviews.filter(review => review != id);
    await campground.save();
    await reviewModel.findByIdAndDelete(id);
    req.flash('success', "Review deleted successfully!");
    res.redirect(`/camp/${campId}`);
}