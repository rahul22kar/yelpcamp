const express = require('express');
const passport = require('passport');

const userController = require('../controllers/userController');
const catchAsync = require('../util/asyncUtils');

const router = express.Router();

router.route('/login')
    .get(userController.renderLogin)
    .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), catchAsync(userController.loginUser));


router.route('/register') 
    .get(userController.renderRegister)
    .post(catchAsync(userController.registerUser));

router.get('/logout', userController.logout);

module.exports = router;