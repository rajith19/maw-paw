const mongoose = require('mongoose');
const PetItem = mongoose.model('PetItem');


const getSinglePetItem = function (req, res) {
    PetItem.findById(req.params.petItemid)
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
const getPetItem = function (req, res) {
    PetItem.find().exec(function (err, petItemData) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(petItemData);
    });
};

const createPetItem = function (req, res) {
    console.log("req", req.body)
    PetItem.create({
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
    if (!req.params.petItemid) {
        res.status(404).json({ "message": "Not found, petItemid is required" })
        return;
    }
    PetItem.findById(req.params.petItemid)
        .exec((err, petItemData) => {
            if (!petItemData) {
                res.status(404).json({ "message": "petItemid not found" });
                return;
            } else if (err) {
                res.status(400).json(err);
                return;
            }

            // console.log("req.body.genres", req.body.genres.toString().split(','))
            petItemData.name = req.body.name,
                petItemData.cardImage = req.body.cardImage,
                petItemData.genres = req.body.genres.toString().split(','),
                petItemData.upcoming = req.body.upcoming,
                petItemData.price = req.body.price,
                petItemData.reviews= {
                    author: req.body.reviews[0].author,
                    rating: req.body.reviews[0].rating,
                    reviewText: req.body.reviews[0].reviewText,
                }
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
    const petItemid = req.params.petItemid;
    if (petItemid) {
        PetItem
            .findByIdAndRemove(petItemid)
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
            .json({ "message": "No petItemid" });
    }
};

module.exports = {
    getPetItem,
    createPetItem,
    getSinglePetItem,
    updatePetItem,
    deletePetItem
}