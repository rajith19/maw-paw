const express = require('express');
const router = express.Router();

const ctrlMovie = require('../controllers/movies')

router
    .route('/movies')
    .get(ctrlMovie.getPetItem)
    .post(ctrlMovie.createPetItem)

router
    .route('/movies/:movieid')
    .get(ctrlMovie.getSinglePetItem)
    .put(ctrlMovie.updatePetItem)
    .delete(ctrlMovie.deletePetItem)

module.exports = router;