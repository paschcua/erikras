import mongoose from 'mongoose';
import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
/* { import MongoCall from '../../models/MongoCall/MongoCall'; } */

export default class Register extends Component {

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleMongoCall = (data1, data2) => {
    console.log(data1 + data2);
    mongoose.connect('mongodb://heroku_r06n6jtm:5jf50mgg9941u4sd42f655q4kb@ds031915.mlab.com:31915/heroku_r06n6jtm');
    var userSchema = new mongoose.Schema({
      userid: Number,
      username: String,
      password: String
    });

    var UserModel = mongoose.model('User', userSchema);

    var UserData = new UserModel({
      userid: 5,
      username: data1,
      password: data2
    });

    UserData.save(function (err) {
      if (err) return console.log(err);
    });
  }

  handleSubmit = (event) => {
    console.log("handleSubmit");
    event.preventDefault();
    var inputUsername = this.refs.username.value;
    var inputPassword = this.refs.password.value;
    this.handleMongoCall(inputUsername, inputPassword);
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
