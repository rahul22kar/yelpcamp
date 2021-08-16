const mongoose =  require('mongoose');

module.exports = mongoose.model('Camp',new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    location: {
        type: String,
        required: [true, "Location is required!"]
    },
    price: {
        type: Number,
        min: 0,
        required: [true, "Price is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required!"]
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    reviews: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Review'
        }
    ]
}));