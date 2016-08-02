var mongoose = require("mongoose");

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
});

mongoose.connect(process.env.MONGODB_URI);

// CREATE
var movieSchema = new mongoose.Schema({
  title: { type: String }
, rating: String
, releaseYear: Number
, hasCreditCookie: Boolean
});

var Movie = mongoose.model('Movie', movieSchema);






// INSERT
var thor = new Movie({
  title: 'Thor2'
, rating: 'PG-14'
, releaseYear: '1955'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
, hasCreditCookie: false
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});







// SELECT
Movie.findOne({ title: 'Thor' }, function(err, thor) {
  if (err) return console.error(err);
  console.dir("m1: "+thor);
});

// Find all movies.
Movie.find(function(err, movies) {
  if (err) return console.error(err);
  console.dir("m2: "+movies);
});

// Find all movies that have a credit cookie.
Movie.find({ hasCreditCookie: true }, function(err, movies) {
  if (err) return console.error(err);
  console.dir("m3: "+movies);
});






// UPDATE
Movie.findOneAndUpdate({releaseYear: '2011'}, {$set:{rating:"PG-20"}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log("doc1: "+doc);
});
