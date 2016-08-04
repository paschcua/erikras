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
module.exports = UserModel;
