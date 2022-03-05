// Filename: movies.js , Studentname: Prit patel ,Studentid: 301219548//

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the movie model
let movie = require('../models/movies');

/* GET movies List page. READ */
router.get('/', (req, res, next) => {
  // find all movies in the movies collection
  movie.find( (err, movies) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('movies/index', {
        title: 'movies',
        movies: movies
      });
    }
  });

});

//  GET the movie Details page in order to add a new movie
router.get('/add', (req, res, next) => {
  // Redirects user to Details Page
  res.render('movies/details', {
    title: 'Add a Movie',
    movies: '',
    action: '/movies/add'
  });

});

// POST process the movie Details page and create a new movie - CREATE
router.post('/add', (req, res, next) => {
  // Gets data from the form
  let data = req.body;
  // Formats data accordinly 
  const newmovie = {
    Title: data.title,
    Description: data.description,
    Price: parseInt(data.price),
    Author: data.author,
    Genre: data.genre
  }
  // Creates the movie on MongoDB
  movie.create(newmovie, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/movies');
    }
  });
});

// GET the movie Details page in order to edit an existing movie
router.get('/:id', (req, res, next) => {
  movie.findById( req.params.id , (err, movie) => {
    if (err) {
      return console.error(err);
    }
    else {
      // Redirects user to Details Page
      res.render('movies/details', {
        title: 'MODIFY HERE',
        movies: movie,
        action: ''
      });
    }
  });
    
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
    // Gets data from the form
    let data = req.body;
    // Formats data accordinly 
    const upsertData = {
      Title: data.title,
      Description: data.description,
      Price: parseInt(data.price),
      Author: data.author,
      Genre: data.genre
    }
    movie.update( {_id: req.params.id} , upsertData, {upsert: true}, (err, result) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.redirect('/movies');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  movie.remove( {_id: req.params.id} , (err) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.redirect('/movies');
    }
  });
});


module.exports = router;
