const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: { type: String, require: true },
    director: { type: String, require: true }
});


module.exports = mongoose.model("Movie", movieSchema);