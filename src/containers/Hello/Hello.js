import React, {Component} from 'react';
import Helmet from 'react-helmet';
var mongoose = require('mongoose');

export default class Hello extends Component {


componentDidMount() {
  var Schema = mongoose.Schema;
  var UserSchema = new Schema({
      _id: String,
      userid: String,
      username: String
  });
  // Mongoose Model definition
  var User = mongoose.model('users', UserSchema);

  // Mongoose connection to MongoDB
  mongoose.connect(process.env.MONGODB_URI, function (error) {
      if (error)return console.log(error);
      console.log("MongoDB: connection to database succesful!");
  });
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
