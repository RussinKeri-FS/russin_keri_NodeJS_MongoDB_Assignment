const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: { 
        type: String, 
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    year: { 
        type: String, 
        required: true 
    },
});


module.exports = mongoose.model("Movie", movieSchema);