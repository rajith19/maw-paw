const mongoose = require('mongoose');
const Pet = mongoose.model('pet');

const getSinglePetItem = function (req, res) {
    Pet.findById(req.params.petitemid)
        .exec((err, petItemData) => {
            if (!petItemData) {
                return res
                    .status(404)
                    .json({
                        "message": "petItemData not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(petItemData);
        });
};

const getPetItems = function (req, res) {
    Pet.find().exec(function (err, petItemData) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(petItemData);
    });
};

const createPetItem = function (req, res) {
    Pet.create({
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients.toString()
        .split(","),
        upcoming: req.body.upcoming,
        price: req.body.price,
        isOnSale: req.body.isOnSale,
        description:req.body.description,
        rating:req.body.rating,
        about_item: req.body.about_item.toString()
        .split(","),
    },
        (err, petItemData) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(petItemData);
            }
        });
};

const updatePetItem = function (req, res) {
    if (!req.params.petitemid) {
        res.status(404).json({ "message": "Not found, petitemid is required" })
        return;
    }
    Pet.findById(req.params.petitemid)
        .exec((err, petItemData) => {
            if (!petItemData) {
                res.status(404).json({ "message": "petitemid not found" });
                return;
            } else if (err) {
                res.status(400).json(err);
                return;
            }
            petItemData.name = req.body.name,
            petItemData.image = req.body.image,
            petItemData.ingredients= req.body.ingredients.toString().split(","),
            petItemData.upcoming = req.body.upcoming,
            petItemData.price = req.body.price,
            petItemData.isOnSale = req.body.isOnSale,
            petItemData.description=req.body.description,
            petItemData.rating=req.body.rating,
            petItemData.about_item= req.body.about_item.toString().split(",")
            petItemData.save((err, petItemData) => {
                if (err) {
                    res.status(404).json(err);
                }
                else {
                    res.status(200).json(petItemData);
                }
            })
        })
};

const deletePetItem = function (req, res) {
    const petitemid = req.params.petitemid;
    if (petitemid) {
        Pet
            .findByIdAndRemove(petitemid)
            .exec((err, petItemData) => {
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
            .json({ "message": "No petitemid" });
    }
};

module.exports = {
    getPetItems,
    createPetItem,
    getSinglePetItem,
    updatePetItem,
    deletePetItem
}