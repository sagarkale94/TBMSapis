const express = require('express');
const router = express.Router();
const Movie = require('../controller/movie');
const verifyToken = require('../middleware/verifyToken');

router.get('/movies/:pageSize/:pageNo', (req, res) => {
    Movie.getAllMovies(req, res);
});

router.get('/movie/:movieId', (req, res) => {
    Movie.getMovieById(req, res);
});

router.post('/movie/add', verifyToken, (req, res) => {
    Movie.addNewMovie(req, res);
});

router.put('/movie/update/:movieId', verifyToken, (req, res) => {
    Movie.updateMovieById(req, res);
});

router.put('/movie/delete/:movieId', verifyToken, (req, res) => {
    Movie.deleteMovieById(req, res);
});

router.post('/movie/addMovieDateAndTimeSlots', verifyToken, (req, res) => {
    Movie.addMovieDateAndTimeSlots(req, res);
});

module.exports = router;