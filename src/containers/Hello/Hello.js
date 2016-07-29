import React, {Component} from 'react';
import Helmet from 'react-helmet';
import mongoose from 'mongoose';


export default class Hello extends Component {

componentDidMount() {
  console.log("ready");
  var mongodbUri = process.env.MONGODB_URI;
  console.log(mongodbUri);

  mongoose.connect(mongodbUri);
  var db = mongoose.connection;
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
