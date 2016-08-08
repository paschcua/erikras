import React, {Component} from 'react';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import superagent from 'superagent';

export default class Register extends Component {
  state = {
    formStatus: 0,
    formMsg: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const inputUsername = this.refs.username.value;
    const inputPassword = this.refs.password.value;

    if (inputUsername.length > 2 && inputUsername.length < 40) {
      if (inputPassword.length > 2 && inputPassword.length < 40) {
        superagent
        .post('/registrieren')
        .type('form')
        .send({ username: inputUsername, password: inputPassword })
        .set('Accept', 'application/json')
        .end((error, res) => {
          if (res.body.status === 1) {
            this.setState({formStatus: 2});
            this.setState({formMsg: 'Die Registrierung war erfolgreich. Herzlich Willkommen bei der Swiss React Community ' + inputUsername + '!'});
            window.localStorage.setItem("ls_username", inputUsername);
            window.localStorage.setItem("ls_pw", inputPassword);
            window.localStorage.setItem("ls_uuid", res.body.uuid);      
          } else {
            this.setState({formStatus: 1});
            this.setState({formMsg: 'Dieser Username exisitiert bereits, wählen Sie bitte einen anderen.'});
          }
        });
      } else {
        this.setState({formStatus: 1});
        this.setState({formMsg: 'Das Passwort muss min. 3 und max. 40 Zeichen enthalten!'});
      }
    } else {
      this.setState({formStatus: 1});
      this.setState({formMsg: 'Der Username muss min. 3 und max. 40 Zeichen enthalten!'});
    }
  }

  render() {
    const {formStatus, formMsg} = this.state;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <Helmet title="Registrieren"/>
        <h1>Registrieren</h1>
        {formStatus < 2 ?
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
        : null
        }
        {formStatus === 2 ?
        <div className="register-success">
          <Label bsStyle="success">Erfolgreich registriert</Label> {formMsg}
          <br />
          <Link to="/community">Zur Community</Link>
        </div>
        : null
        }
        {formStatus === 1 ?
        <div className="register-success">
          <Label bsStyle="danger">Fehler</Label> {formMsg}
        </div>
        : null
        }
      </div>
    );
  }


}
