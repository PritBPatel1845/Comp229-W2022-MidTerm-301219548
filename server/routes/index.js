// Filename: index.js , Studentname: Prit patel ,Studentid: 301219548//
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the movie model
let movie = require('../models/movies');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    movies: ''
   });
});

module.exports = router;
