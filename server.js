let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/bookstore');
mongoose.connect('mongodb://localhost/bookstore');
let db = mongoose.connection;



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

app.listen(3000);
console.log('Running on port 3000');
