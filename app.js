let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
let db = mongoose.connection;

app.get('/', function(req, res){
  res.send('Please use /api/books or /api/genres');
});

// Connect to Routes

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
      if(err){
        throw err;
      }
      res.json(genres);
    });
});

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
      if(err){
        throw err;
      }
      res.json(books);
    });
});

app.listen(3000);
console.log('Running on port 3000');
