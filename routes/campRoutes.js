const express = require('express');

const campController = require('../controllers/campController');
const catchAsync = require('../util/asyncUtils');
const {isLoggedIn, checkCampPermission} = require('../util/middlewares');

const router = express.Router();

router.get('/', isLoggedIn, catchAsync(campController.getCamps));

router.route('/new')
    .get(isLoggedIn, campController.renderNew)
    .post(isLoggedIn, catchAsync(campController.createNew));

router.get('/:id', isLoggedIn, catchAsync(campController.showCamp));

router.route('/edit/:id')
    .get(isLoggedIn, checkCampPermission, catchAsync(campController.renderEditCamp))
    .patch(isLoggedIn, checkCampPermission, catchAsync(campController.editCamp));

router.delete('/delete/:id', isLoggedIn, checkCampPermission, catchAsync(campController.deleteCamp));

module.exports = router;