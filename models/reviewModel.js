const mongoose =  require('mongoose');

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Review Text is required!"]
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        min: 0,
        required: [true, "Rating is required!"]
    }
});

module.exports = mongoose.model('Review', reviewSchema);