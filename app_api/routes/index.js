const express = require('express');
const router = express.Router();

const ctrlPetItem = require('../controllers/petItems')

router
    .route('/movies')
    .get(ctrlPetItem.getPetItem)
    .post(ctrlPetItem.createPetItem)

router
    .route('/movies/:movieid')
    .get(ctrlPetItem.getSinglePetItem)
    .put(ctrlPetItem.updatePetItem)
    .delete(ctrlPetItem.deletePetItem)

module.exports = router;