/*
* More details here http://mongoosejs.com/docs/guide.html
*/

var mongoose = require("mongoose");

//connect to database
var db = mongoose.connect(process.env.MONGODB_URI);

//create schema for blog post
var blogSchema = new mongoose.Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


//create new model
var post = new BlogPost({title: "My first post", author: "Yash Kumar",
													body: "We want to make documentation obsolete"});

//save model to MongoDB
post.save(function (err) {
  if (err) {
	process.exit(1);
  }
  else {
  	process.exit(0);
  }
});

//compile schema to model
module.exports = db.model('blog', blogSchema)
