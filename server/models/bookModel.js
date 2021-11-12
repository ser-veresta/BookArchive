const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  genre: String,
  img: String,
  authorId: String,
});

module.exports = mongoose.model("Books", bookSchema);
