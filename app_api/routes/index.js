const express = require('express');
const router = express.Router();

const ctrlPetItem = require('../controllers/pet')

router
    .route('/petitems')
    .get(ctrlPetItem.getPetItems)
    .post(ctrlPetItem.createPetItem)

router
    .route('/petitems/:petitemid')
    .get(ctrlPetItem.getSinglePetItem)
    .put(ctrlPetItem.updatePetItem)
    .delete(ctrlPetItem.deletePetItem)

module.exports = router;