import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import superagent from 'superagent';

export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const inputUsername = this.refs.username.value;
    const inputPassword = this.refs.password.value;

    superagent
    .post('/registrieren')
    .type('form')
    .send({ username: inputUsername, password: inputPassword })
    .set('Accept', 'application/json')
    .end(function(err, res){
      console.log("aha 1"+res.data.second);
      console.log(res.data.first);
      console.log("aha 2"+res.data.text);
    });
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
        <input type="text" ref="username" name="username" id="username" placeholder="Username" className="form-control"/>
        </div>
        <div className="form-group">
        <input type="password" ref="password" name="password" id="password" placeholder="Passwort" className="form-control"/>
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
