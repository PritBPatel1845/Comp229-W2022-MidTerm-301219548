// Filename: movies.js , Studentname: Prit patel ,Studentid: 301219548//
let mongoose = require('mongoose');

// create a model class
let movie = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "movies"
});

module.exports = mongoose.model('movies', movie);
