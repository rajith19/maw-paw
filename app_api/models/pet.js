const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
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
    },
    about_item: { 
        type: [String], 
        required: true 
    },
});

mongoose.model('pet', petSchema);