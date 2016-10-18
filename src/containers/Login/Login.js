import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    registerNewUserState: store.registerNewUser.user,
  };
})

export default class Login extends Component {

  render() {
    const { registerNewUserState } = this.props;
    return (
        <div className="container">
          <h1>Kontakt...</h1>
          <Helmet title="Login"/>
          <p>Login will open soon...</p>
        </div>
    );
  }

}
