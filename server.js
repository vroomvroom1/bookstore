let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var CONTACTS_COLLECTION = "contacts";


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }


app.config(function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
  });

app.get('/', function(req, res){
  res.send('Please use /api/books or /api/genres');
});

// Connect to Routes, requests genres

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
      if(err){
        throw err;
      }
      res.json(genres);
    });
});

app.post('/api/genres', function(req, res){
    let genre = req.body;
    Genre.addGenre(genre, function(err, genre){
      if(err){
        throw err;
      }
      res.json(genre);
    });
});

app.put('/api/genres/:_id', function(req, res){
  let id = req.params._id;
    let genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
      if(err){
        throw err;
      }
      res.json(genre);
    });
});

app.delete('/api/genres/:_id', function(req, res){
  let id = req.params._id;
    Genre.deleteGenre(id, function(err, genre){
      if(err){
        throw err;
      }
      res.json(genre);
    });
});

//Requests Books

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
      if(err){
        throw err;
      }
      res.json(books);
    });
});

app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
    });
});

app.post('/api/books', function(req, res){
    let book = req.body;
    Book.addBook(book, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
    });
});

app.put('/api/books/:_id', function(req, res){
  let id = req.params._id;
    let book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
    });
});

app.delete('/api/books/:_id', function(req, res){
  let id = req.params._id;
    Book.removeBook(id, function(err, book){
      if(err){
        throw err;
      }
      res.json(book);
    });
});

//Testing Purposes

db = client.db();
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
