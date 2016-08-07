import React, {Component} from 'react';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import superagent from 'superagent';

export default class Register extends Component {
  state = {
    showFormMsg: false,
    formMsg: ''
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
    .end((error, res) => {
      if (res.body.status === 1) {
        this.setState({formMsg: 'Registrierung erfolgreich ' + res.body.msg + '!'});
        this.setState({showFormMsg: true});
      }else {
        this.setState({formMsg: 'Dieser Username exisitiert bereits, wählen Sie bitte einen anderen.'});
      }
    });
  }

  render() {
    const {showFormMsg, formMsg} = this.state;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <Helmet title="Registrieren"/>
        <h1>Registrieren</h1>
        <div id="register-form">
          <form className="login-form form-inline" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" ref="username" name="username" id="username" placeholder="Username" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" name="password" id="password" placeholder="Passwort" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-success"><i className="fa fa-sign-in"/> Registrieren</button>
          </form>
        </div>
        {showFormMsg ?
        <div className="register-success">
          <Label bsStyle="success">Erfolgreich registriert</Label>
          {formMsg}
          <Link to="/community">Zur Community</Link>
        </div>
        :
        <div className="register-success">
          <Label bsStyle="error">Error</Label>
          {formMsg}
        </div>
        }
      </div>
    );
  }


}
