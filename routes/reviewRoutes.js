const express = require('express');

const reviewController = require('../controllers/reviewController');
const catchAsync = require('../util/asyncUtils');

const {checkReviewPermission} = require('../util/middlewares');

const router = express.Router();

router.post('/new/:id', catchAsync(reviewController.createNewReview));

router.delete('/delete/:id/:campId', checkReviewPermission, catchAsync(reviewController.deleteReview));

module.exports = router;