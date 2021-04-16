const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');


const getSingleMovie = function (req, res) {
    Movie.findById(req.params.movieid)
        .exec((err, movieData) => {
            if (!movieData) {
                return res
                    .status(404)
                    .json({
                        "message": "movieData not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(movieData);
        });

};
const getMovies = function (req, res) {
    Movie.find().exec(function (err, movieData) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(movieData);
    });
};

const createMovie = function (req, res) {
    console.log("req", req.body)
    Movie.create({
        name: req.body.name,
        cardImage: req.body.cardImage,
        genres: req.body.genres.split(","),
        upcoming: req.body.upcoming,
        price: req.body.price,
        reviews: {
            author: req.body.reviews[0].author,
            rating: req.body.reviews[0].rating,
            reviewText: req.body.reviews[0].reviewText,
        }
    },
        (err, movieData) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(movieData);
            }
        });

};

const updateMovie = function (req, res) {
    if (!req.params.movieid) {
        res.status(404).json({ "message": "Not found, movieid is required" })
        return;
    }
    Movie.findById(req.params.movieid)
        .exec((err, movieData) => {
            if (!movieData) {
                res.status(404).json({ "message": "movieid not found" });
                return;
            } else if (err) {
                res.status(400).json(err);
                return;
            }

            // console.log("req.body.genres", req.body.genres.toString().split(','))
            movieData.name = req.body.name,
                movieData.cardImage = req.body.cardImage,
                movieData.genres = req.body.genres.toString().split(','),
                movieData.upcoming = req.body.upcoming,
                movieData.price = req.body.price,
                movieData.reviews= {
                    author: req.body.reviews[0].author,
                    rating: req.body.reviews[0].rating,
                    reviewText: req.body.reviews[0].reviewText,
                }
                movieData.save((err, movieData) => {
                    if (err) {
                        res.status(404).json(err);
                    }
                    else {
                        res.status(200).json(movieData);
                    }
                })
        })
};

const deleteMovie = function (req, res) {
    const movieid = req.params.movieid;
    if (movieid) {
        Movie
            .findByIdAndRemove(movieid)
            .exec((err, movieData) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(204)
                    .json(null);
            });
    } else {
        res
            .status(404)
            .json({ "message": "No movieid" });
    }
};

module.exports = {
    getMovies,
    createMovie,
    getSingleMovie,
    updateMovie,
    deleteMovie
}