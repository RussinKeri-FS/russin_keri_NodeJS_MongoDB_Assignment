const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Movie = require('../models/movie');
const Messages = require('../../messages/messages');

// GET routes
router.get('/', (req, res, next) => {
  Movie.find({})
    .select('movie director _id')
    .exec()
    .then((movieList) => {
      // validation to check if collection is empty
      if (movieList < 1) {
        res.status(200).json({
          message: Messages.movie_collection_empty,
        });
      }
      res.status(200).json({
        message: Messages.movie_collection,
        movieList,
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

router.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;

  Movie.findById({ _id: movieId })
    .select('movie _id')
    .exec()
    .then((movie) => {
      console.log(movie);

      // validation to check if movie is in collection
      if (!movie) {
        res.status(404).json({
          message: Messages.movie_not_found,
        });
      }
      res.status(200).json({
        message: Messages.movie_selected,
        movie,
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

// POST route
router.post('/', (req, res, next) => {
  Movie.find({
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
  })
    .exec()
    .then((result) => {
      console.log(result);

      // validation to check if movie is already in database
      if (result.length > 0) {
        return res.status(409).json({
          message: Messages.movie_post_duplicated,
        });
      }

      // create movie object
      const newMovie = new Movie({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,
      });

      // write new movie info to the database
      newMovie.save().then((movie) => {
        console.log(movie);
        res.status(201).json({
          message: Messages.movie_submitted,
          movie: {
            movie: movie.movie,
            director: movie.director,
            genre: movie.genre,
            year: movie.year,
            id: movie._id,
          },
          metadata: {
            method: req.method,
            host: req.hostname,
          },
        });
      });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).json({
        error: {
          message: err.message,
        },
      });
    });
});

// PATCH route
router.patch('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;

  const updateMovie = {
    movie: req.body.movie,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
  };

  Movie.findByIdAndUpdate(
    {
      _id: movieId,
    },
    {
      $set: updateMovie,
    }
  )
    .exec()
    .then((result) => {
      // validation to check if movie is in collection
      if (!movieId) {
        console.log(result);
        res.status(404).json({
          error: {
            message: Messages.movie_not_found,
          },
        });
      }
      res.status(200).json({
        message: Messages.movie_updated,
        result: {
          movie: updateMovie.movie,
          director: updateDirector.director,
          genre: updateMovie.genre,
          year: updateMovie.year,
          id: movieId,
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

// DELETE route
router.delete('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId;

  const deleteMovie = {
    movie: req.body.movie,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
  };

  Movie.findByIdAndDelete(
    {
      _id: movieId,
    },
    {
      $set: deleteMovie,
    }
  )
    .exec()
    .then((result) => {
      // validation to check if movie exists in collection
      if (!movieId) {
        console.log(result);
        res.status(404).json({
          error: {
            message: Messages.movie_not_found,
          },
        });
      }
      res.status(200).json({
        message: Messages.movie_deleted,
        result,
        request: {
          url: `http://localhost:3000/movie/${movieId}`,
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

module.exports = router;
