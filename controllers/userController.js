const userModel = require('../models/userModel');
const passport = require('passport');

module.exports.renderLogin = (req, res) => {
    if(req.user) return res.redirect('/camp');
    res.render('auth/login');
}

module.exports.loginUser = async (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        const redirectUrl = req.session.returnTo || "/camp";
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    });
}

module.exports.renderRegister = (req, res) => {
    res.render('auth/register');
}

module.exports.registerUser = async (req, res, next) => {
    const user = await userModel.register(new userModel({ username : req.body.username, email: req.body.email }), req.body.password);
    req.login(user, err => {
        if (err) return next(err);
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/camp');
        });
    });
    
}

module.exports.logout = (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};