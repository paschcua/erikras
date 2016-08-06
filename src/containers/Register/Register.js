import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import mongoose from 'mongoose';
/* { import MongoCall from '../../models/MongoCall/MongoCall'; } */
console.log('START');

export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleMongoCall = (aaa, bbb) => {
    console.log('ehm ok: ' + aaa + bbb);

    /* {
    var db = mongoose.connection;
    console.log('db: ' + db);

    db.on('error', function() {
      console.log('nonono error.');
    });
    db.once('open', function() {
      console.log('yes open conn.');
    });
    } */
    console.log('mongoose object: ' + mongoose);

    var userSchema = new mongoose.Schema({
      userid: Number,
      username: String,
      password: String
    });

    var UserModel = mongoose.model('User', userSchema);

    console.log('UserModel: ' + UserModel);
    var UserData = new UserModel({
      userid: 20,
      username: aaa,
      password: bbb
    });
    UserData.save(function (err) {
      console.log('done SAVE:'+ UserData);
      if (err) return console.log(err);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('ehm ok handle submit!');
    let inputUsername = this.refs.username.value;
    let inputPassword = this.refs.password.value;
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
          <button type="submit" className="btn btn-success"><i className="fa fa-sign-in"/>Registrieren</button>
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
