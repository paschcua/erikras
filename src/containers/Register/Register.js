import React, {Component} from 'react';
import Label from 'react-bootstrap/lib/Label';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import superagent from 'superagent';

export default class Register extends Component {
  state = {
    showKitten: false
  }

  /* {  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});  }*/

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('1: ' + this.state.showKitten);

    const inputUsername = this.refs.username.value;
    const inputPassword = this.refs.password.value;

    superagent
    .post('/registrieren')
    .type('form')
    .send({ username: inputUsername, password: inputPassword })
    .set('Accept', 'application/json')
    .end((error, res) => {
      if (res.body.status === 1) {
        const requestMsg = 'Registrierung erfolgreich ' + res.body.msg + '!';
        this.setState({showKitten: !this.state.showKitten});
        console.log('2: ' + this.state.showKitten);
      }else {
        const requestMsg = 'Dieser Username exisitiert bereits, wählen Sie bitte einen anderen.';
      }
    });
  }

  render() {
    const {showKitten} = this.state;
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
        {showKitten &&
        <div className="register-success">
          <Label bsStyle="success">Erfolgreich registriert</Label>
          <Link to="/community">Zur Community</Link>
        </div>
        }
      </div>
    );
  }


}
