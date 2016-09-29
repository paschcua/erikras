import React, {Component} from 'react';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    registerNewUserState: store.registerNewUser.user,
  };
})

export default class Community extends Component {

  state = {
    loginEmail: cookie.load('ck_email'),
    loginPw: cookie.load('ck_pw')
  }

  render() {
    const {loginEmail} = this.state;
    const { registerNewUserState } = this.props;

    return (
      <div className="container">
        <h1>Community...</h1>
        <Helmet title="Community"/>
          {loginEmail !== null ?
              loginEmail
            : null
          }
          {registerNewUserState.email}
        <p>Community will open soon...</p>
      </div>
    );
  }

}
