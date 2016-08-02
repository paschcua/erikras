var mongoose = require("mongoose");

var db = mongoose.connect(process.env.MONGODB_URI);

var blogSchema = new mongoose.Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  random: { type: [Number], index: '2d' },
  meta: {
    votes: Number,
    favs:  Number
  }
});

var Person = mongoose.model('blog', blogSchema);

Person.findOne({author: "Yash Kumar"}, function(err, doc) {
	if (err) {
    console.log("Error1: "+err);
	}
	else {
		console.log("Success1: "+doc);
	}
});

module.exports = db.model('blog', blogSchema)
