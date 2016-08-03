import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import mongoose from 'mongoose';

export default class Register extends Component {

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  mongoInitial() {
    var db = mongoose.connection;

    db.on('error', console.error);
    db.once('open', function() {
    });
    mongoose.connect(process.env.MONGODB_URI);

    var userData = new mongoose.Schema({
      userid: Number,
      username: String,
      password: String
    });

    var UserModel = mongoose.model('User', userData);
  }


  mongoInsert(inputUsername, inputPassword) {
    var thor = new Movie({
      userid: 1,
      username: inputUsername,
      password: inputPassword
    });

    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.mongoInitial();
    const inputUsername = this.refs.username.value;
    const inputPassword = this.refs.password.value;

    this.mongoInsert(inputUsername, inputPassword);
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
