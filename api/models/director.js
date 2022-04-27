const mongoose = require("mongoose");

const directorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    director: { type: String, require: true }
});


module.exports = mongoose.model("Director", directorSchema)