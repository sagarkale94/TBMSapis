const Config = require('../../config');
const Movie = require('../model/movie');

module.exports = {

    getAllMovies: (req, res) => {
        Movie.find({
            isDeleted: 0
        }).limit().skip().sort().then(movies => {
            if (movies.length == 0) {
                res.send({ errCode: Config.errCodeNoRecordFound, message: "No record found..!!", data: [] });
            } else if (movies.length > 0) {
                res.send({ errCode: Config.errCodeSuccess, message: "", data: movies });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    },

    getMovieById: (req, res) => {
        let movieId = req.params.movieId;
        Movie.findById(movieId).then(movie => {
            if (movie) {
                res.send({ errCode: Config.errCodeSuccess, message: "", data: movie });
            } else {
                res.send({ errCode: Config.errCodeError, message: Config.errMessage });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    },

    addNewMovie: (req, res) => {
        const movie = new Movie({
            name: req.body.name,
            description: req.body.description,
            posterUrl: req.body.posterUrl,
        })
        movie.save().then(result => {
            if (result) {
                res.send({ errCode: Config.errCodeSuccess, message: "Movie added successfully..!!" });
            } else {
                res.send({ errCode: Config.errCodeError, message: Config.errMessage });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    },

    updateMovieById: (req, res) => {
        let movieId = req.params.movieId;
        Movie.findById(movieId).then(movie => {
            movie.name = req.body.name;
            movie.description = req.body.description;
            movie.posterUrl = req.body.posterUrl;
            return movie.save();
        }).then(result => {
            if (result) {
                res.send({ errCode: Config.errCodeSuccess, message: "Movie updates successfully..!!" });
            } else {
                res.send({ errCode: Config.errCodeError, message: Config.errMessage });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    },

    deleteMovieById: (req, res) => {
        let movieId = req.params.movieId;
        Movie.findById(movieId).then(movie => {
            movie.isDeleted = 1;
            return movie.save();
        }).then(result => {
            if (result) {
                res.send({ errCode: Config.errCodeSuccess, message: "Movie deleted successfully..!!" });
            } else {
                res.send({ errCode: Config.errCodeError, message: Config.errMessage });
            }
        }).catch(err => {
            res.send({ errCode: Config.errCodeError, message: Config.errMessage });
        });
    }

}