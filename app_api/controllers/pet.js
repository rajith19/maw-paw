const mongoose = require('mongoose');
const Pet = mongoose.model('pet');


const getSinglePetItem = function (req, res) {
    Pet.findById(req.params.petItemid)
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
    console.log("req", req.body);
    console.log("Mongoose: ", Pet.collection.collectionName);

    Pet.find().exec(function (err, petItemData) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.status(200).json(petItemData);
        console.log("pet: ", petItemData);
    });
};

const createPetItem = function (req, res) {
    console.log("req", req.body)
    Pet.create({
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients.split(","),
        upcoming: req.body.upcoming,
        price: req.body.price,
        isOnSale: req.body.isOnSale,
        description:req.body.description,
        rating:req.body.rating
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
    Pet.findById(req.params.petItemid)
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
            petItemData.name = req.body.name,
            petItemData.image = req.body.image,
            petItemData.ingredients= req.body.ingredients.split(","),
            petItemData.upcoming = req.body.upcoming,
            petItemData.price = req.body.price,
            petItemData.isOnSale = req.body.isOnSale,
            petItemData.description=req.body.description,
            petItemData.rating=req.body.rating
               
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
        Pet
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
    getPetItems,
    createPetItem,
    getSinglePetItem,
    updatePetItem,
    deletePetItem
}