const express = require('express');
const router = express.Router();

const ctrlMovie = require('../controllers/movies')

router
    .route('/movies')
    .get(ctrlMovie.getPetItem)
    .post(ctrlMovie.createMovie)

router
    .route('/movies/:movieid')
    .get(ctrlMovie.getSinglePetItem)
    .put(ctrlMovie.updateMovie)
    .delete(ctrlMovie.deleteMovie)

module.exports = router;