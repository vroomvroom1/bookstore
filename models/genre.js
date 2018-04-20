let mongoose = require('mongoose');

// Genre Schema
let genreSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

let Genre = module.exports = mongoose.model('Genre', genreSchema);

// Get Genres
module.exports.getGenres = function(callback, limit){
  Genre.find(callback).limit(limit);
};

//Add Genres
module.exports.addGenre = function(genre, callback){
  Genre.create(genre, callback);
};

//Update Genres
module.exports.updateGenre = function(id, genre, options, callback){
  let query = {_id: id};
  let update = {
    name: genre.name
  }
  Genre.findOneAndUpdate(query, update, options, callback);
};

//Delete Genre
module.exports.deleteGenre = function(id, callback){
  let query = {_id: id};
  Genre.remove(query, callback);
};
