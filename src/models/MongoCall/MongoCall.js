  var mongoose = require('mongoose');
  var db = mongoose.connection;

  db.on('error', console.error);
  db.once('open', function() {
  });
  mongoose.connect('mongodb://heroku_r06n6jtm:5jf50mgg9941u4sd42f655q4kb@ds031915.mlab.com:31915/heroku_r06n6jtm');

  var userSchema = new mongoose.Schema({
    userid: Number,
    username: String,
    password: String
  });

  var UserModel = mongoose.model('User', userSchema);

export function addit() {
  var UserData = new UserModel({
    userid: 2,
    username: "inputUsername6xxxx",
    password: "inputPassword6xxx"
  });

  UserData.save(function (err) {
    if (err) return console.log(err);
  });
}
