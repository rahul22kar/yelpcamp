const mongoose =  require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}).plugin(passportLocalMongoose));
