/*
* More details here http://mongoosejs.com/docs/guide.html
*/

var mongoose = require("mongoose");

//connect to database
var db = mongoose.connect(process.env.MONGODB_URI);

//create schema for blog post
var blogSchema = new mongoose.Schema({
  title:  String,
  author: "String111",
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

//compile schema to model
module.exports = db.model('blog', blogSchema)
