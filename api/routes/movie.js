const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Movie = require("../models/movie");


// GET routes
router.get("/", (req, res, next) => {
    Movie.find({})
    .then((result) => {
        res.status(200).json({
            movie: {
                title: result.title,
            },
        });
    })
    .catch((err) => {
        res.status(500).json({
            error: {
                message: err.message,
            },
        });
    });
});

// POST
router.post("/", (req, res, next) => {
    const newMovie = new Movie({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        director: req.body.director
    });

    // write to the DB
    newMovie.save()
    .then (result => {
        console.log(result);
        res.status(200).json({
            message: "Movie Saved",
            movie:{
                title: result.title,
                director: result.director,
                id: result._id,
                metadata:{
                    method: req.method,
                    host: req.hostname
                },
            },
        });
    })
    .catch(err => {
        console.error(err.message);
        res.status(500).json({
            error:{
                message: err.message
            },
        });
    });
});

// GET by id
router.get("/:movieId", (req, res, next) => {
    const movieId = req.params.movieId;
    
    Movie.findById({ _id: movieId })
    .then((result) => {
        res.status(200).json({
            message: "Movie Selected",
            movie: {
                title: result.title,
                director: result.director,
                id: result._id,
            },
        });
    });
});

// PATCH by id
router.patch("/:movieId", (req, res, next) => {
    const movieId = req.params.movieId;
    const updateMovie = {
        title: req.body.title,
        director: req.body.director
    };
    Movie.updateOne({
        _id: movieId
    }, 
    {
        $set: updateMovie
    })
    .then(result => {
        res.status(200).json({
            message: "Updated Movie",
            movie: {
                title: result.title,
                director: result.director,
                id: result._id
            },
            metadata: {
                host: req.hostname,
                method: req.method
            },
        });
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            },
        });    
    });
});

// DELETE by id
router.delete("/:movieId", (req, res, next) => {
    const movieId = req.params.movieId;
    Movie.deleteOne({ _id: movieId })
    .then((result) => {
        res.status(200).json({
            message: "Movie Deleted",
            movie: {
                title: result.title,
                director: result.director,
                id: result._id,
            },
        });
    })
    .catch(err => {
        res.status(500).json({
            error: {
                message: err.message
            },
        });    
    })
});


module.exports = router;