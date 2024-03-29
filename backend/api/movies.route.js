import express from "express";
import MoviesController from "./movies.controller.js";
import ReviewsController from './reviews.controller.js'

//get access to express router
const router = express.Router() 
router.route('/').get(MoviesController.apiGetMovies)
router.route("/id/:id").get(MoviesController.apiGetMovieById)
router.route("/ratings").get(MoviesController.apiGetRatings)
router.route('/review').post(ReviewsController.apiPostReview).put(ReviewsController.apiPutReview).delete(ReviewsController.apiDeleteReview)

export default router