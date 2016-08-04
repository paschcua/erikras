import React from 'react';

export default function MongoCall() {

  var mongoose = require('mongoose');
  var db = mongoose.connection;

  db.on('error', console.error);
  db.once('open', function() {
  });
  mongoose.connect(process.env.MONGODB_URI);

  var userSchema = new mongoose.Schema({
    userid: Number,
    username: String,
    password: String
  });

  var UserModel = mongoose.model('User', userSchema);

  var userdata = new UserModel({
    userid: 2,
    username: "inputUsername4",
    password: "inputPassword4"
  });

  userdata.save(function (err) {
    if (err) return console.log(err);
  })

}
