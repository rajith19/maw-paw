const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: { type: Date, default: Date.now() }
});



const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cardImage: String,
    genres: { type: [String], required: true },
    reviews: [reviewSchema],
    upcoming: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        default: 0
    }
});


mongoose.model('Movie', movieSchema);