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
