import React, {Component} from 'react';
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { connect } from 'react-redux';

@connect((store) => {
  console.log('hmm store: '+JSON.stringify(store.getData.user));
  return {
    getData: store.getData.user,
  };
})

export default class Community extends Component {

  state = {
    loginEmail: cookie.load('ck_email'),
    loginPw: cookie.load('ck_pw'),
    loginUuid: cookie.load('ck_uuid')
  }

  render() {
    const {loginEmail} = this.state;

    return (
      <div className="container">
        <h1>Community...</h1>
        <Helmet title="Community"/>
          {loginEmail !== null ?
              loginEmail
            : null
          }
        <p>Community will open soon...</p>
      </div>
    );
  }

}
