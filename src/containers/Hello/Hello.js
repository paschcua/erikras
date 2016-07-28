import React, {Component} from 'react';
import Helmet from 'react-helmet';


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
  mongoose.connect('mongodb://makingsense:1qaz2wsx@ds037272.mongolab.com:37272/demo', function (error) {
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
