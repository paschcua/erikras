import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
/* { import MongoCall from '../../models/MongoCall/MongoCall'; } */


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
var UserData = new UserModel({
  userid: 2,
  username: "inputUsername45adsdsadsadsa5xxxx",
  password: "inputPassword4dsadsadsa55xxx"
});

UserData.save(function (err) {
  console.log("done!");
  if (err) return console.log(err);
});




export default class Register extends Component {

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    /* {
    const inputUsername = this.refs.username.value;
    const inputPassword = this.refs.password.value;
    this.handleMongoCall(inputUsername, inputPassword);
    } */
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
      <Helmet title="Register"/>
      <h1>Registrieren</h1>
      {!user &&
        <div>
        <form className="login-form form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
        <input type="text" ref="username" placeholder="Username" className="form-control"/>
        </div>
        <div className="form-group">
        <input type="password" ref="password" placeholder="Passwort" className="form-control"/>
        </div>
        <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Registrieren</button>
        </form>
        </div>
      }
      {user &&
        <div>
        <p>You are currently logged in as username...</p>

        <div>
        <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
        </div>
        </div>
      }
      </div>
    );
  }


}
