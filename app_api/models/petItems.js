const mongoose = require('mongoose');

const petItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type : String, 
        required :true
    },
    ingredients: { 
        type: [String], 
        required: true 
    },
    isOnSale: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    description : {
        type: String,
        required : true
    },
    rating: {
        type: Number,
        default: true,
        required: true
    }
});


mongoose.model('PetItem', petItemSchema);