import React, {Component} from 'react';
import Helmet from 'react-helmet';
import mongoose from 'mongoose';


export default class Hello extends Component {


componentDidMount() {
  var db = mongoose.connection;

  db.on('error', console.error);


  db.once('open', function() {

    var movieSchema = new mongoose.Schema({
      title: { type: String }
    , rating: String
    , releaseYear: Number
    , hasCreditCookie: Boolean
    });

    // Compile a 'Movie' model using the movieSchema as the structure.
    // Mongoose also creates a MongoDB collection called 'Movies' for these documents.
    var Movie = mongoose.model('Movie', movieSchema);

    var thor = new Movie({
      title: 'Thor'
    , rating: 'PG-13'
    , releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
    , hasCreditCookie: true
    });

    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });



    // Find a single movie by name.
    Movie.findOne({ title: 'Thor' }, function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });

    // Find all movies.
    Movie.find(function(err, movies) {
      if (err) return console.error(err);
      console.dir(movies);
    });

    // Find all movies that have a credit cookie.
    Movie.find({ hasCreditCookie: true }, function(err, movies) {
      if (err) return console.error(err);
      console.dir(movies);
    });

  });



  mongoose.connect('mongodb://heroku_r06n6jtm:5jf50mgg9941u4sd42f655q4kb@ds031915.mlab.com:31915/heroku_r06n6jtm');
}


  render() {
    return (
      <div className="container">
        <h1>Hello, Dude!!</h1>
        <Helmet title="Hello Dude GO GO"/>
        Have a wondeful day!!!!!! GO GO GO
      </div>
    );
  }

}
