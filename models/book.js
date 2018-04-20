let mongoose = require('mongoose');

// Book Schema
let bookSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  genre:{
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  author:{
    type: String,
    required: true
  },
  publisher:{
    type: String,
  },
  pages:{
    type: String,
  },
  image_url:{
    type: String,
  },
  buy_url:{
    type: String,
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

let Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit){
  Book.find(callback).limit(limit);
};
