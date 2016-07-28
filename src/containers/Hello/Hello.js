import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Hello extends Component {


componentDidMount() {
  var Promise = require("bluebird")
  var MongoDB = require("mongodb")
  Promise.promisifyAll(MongoDB)

  return MongoDB.connectAsync(process.env.MONGODB_URI).then(function(db){
    var collection = db.collection('queue')
    return collection.find().toArrayAsync().then(function(docs){
      console.log(docs)
    })
  }).catch(function(e){
    console.log(e.message)
    throw e
  })

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
