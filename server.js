let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let port = process.env.PORT || 8080; 


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//Connect to mongoose
mongoose.connect('mongodb://root:matthew1@ds231070.mlab.com:31070/vroom1', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
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

app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port
});
