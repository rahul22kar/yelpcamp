const campModel = require('../models/campModel');
const reviewSchema = require('../models/reviewModel');
const geocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = geocoding({accessToken: process.env.MAPBOX_TOKEN});

module.exports.getCamps = async (req, res, next) => {
    let result = await campModel.find({});
    res.render('camp/allCamps', { result });
}

module.exports.renderNew = (req, res) => {
    res.render('camp/newCamp');
}

module.exports.createNew = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const { campground } = req.body;
    const newCamp = new campModel(campground);
    newCamp.geometry = geoData.body.features[0].geometry;
    newCamp.author = req.query._author;
    await newCamp.save();
    req.flash('success', "Campground created successfully!");
    res.redirect(`/camp/${newCamp._id}`);
}

module.exports.showCamp = async (req, res, next) => {
    const { id } = req.params;
    let result = await campModel.findById(id);
    if (!result) {
        req.flash('error', "Cannot find that campground");
        return res.redirect('/camp')
    }
    await result.populate('reviews').execPopulate();
    await result.populate('author').execPopulate();
    res.render('camp/show', { result });
}

module.exports.renderEditCamp = async (req, res, next) => {
    const { id } = req.params;
    let campground = await campModel.findById(id);
    if (!campground) {
        req.flash('error', "Cannot find that campground");
        return res.redirect('/camp')
    }
    res.render('camp/editCamp', {campground});
}

module.exports.editCamp = async (req, res, next) => {
    const { id } = req.params;
    const { campground } = req.body;
    await campModel.findOneAndUpdate({ _id: id }, campground);
    req.flash('success', "Campground edited successfully!");
    res.redirect(`/camp/${id}`);
}

module.exports.deleteCamp = async (req, res, next) => {
    const { id } = req.params;
    let campground = await campModel.findById(id);
    await reviewSchema.deleteMany({"_id": {$in : campground.reviews}}); 
    await campModel.findByIdAndDelete(id);
    req.flash('success', "Campground deleted successfully!");
    res.redirect('/camp');
}