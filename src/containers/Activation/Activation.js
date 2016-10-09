import React, {Component} from 'react';
import Well from 'react-bootstrap/lib/Well';
import Helmet from 'react-helmet';
import superagent from 'superagent';
import cookie from 'react-cookie';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    activateNewUserState: store.activateNewUser.userStatus,
  };
})

export default class Activation extends Component {
  state = {
    responseStatus: 0,
    responseMsg: ''
  }

  componentDidMount() {
    const queryM = this.props.location.query.m;
    const queryU = this.props.location.query.u;
    superagent
    .post('/activation')
    .send({ queryM: queryM, queryU: queryU })
    .set('Accept', 'application/json')
    .end((error, res) => {
      if (res.body.status === 1) {
        this.setState({responseStatus: 1});
        this.setState({responseMsg: 'Dein Account wurde erfolgreich bestätigt! Herzlich willkommen bei der Swiss React Community! '});

        this.props.dispatch(activateNewUser(true, true)); /* Persistent State/Cookie - LoggedIn & Activated */

        cookie.save('ck_userLoggedIn', '1', { expires: new Date(new Date().getTime() + (3600*3600*3600)) });
        cookie.save('ck_activation', '1', { expires: new Date(new Date().getTime() + (3600*3600*3600)) });
      } else {
        this.setState({responseStatus: 2});
        this.setState({responseMsg: 'Es liegt ein Fehler mit der Bestätigung deines Accounts vor, bitte versuche es später nochmals! '});
        cookie.save('ck_userLoggedIn', '0', { expires: new Date(new Date().getTime() + (3600*3600*3600)) });
        cookie.save('ck_activation', '0', { expires: new Date(new Date().getTime() + (3600*3600*3600)) });
      }
    });
  }

  render() {
    const {responseMsg, responseStatus} = this.state;
    const { activateNewUserState } = this.props;

    return (
      <div className="container">
        <Helmet title="Aktivierung"/>
          {responseStatus === 0 ?
              <h3></h3>
            : null
          }
          {responseStatus === 1 ?
            <Well>
              <h3>Erfolgreich Account bestätigt</h3>
              <div dangerouslySetInnerHTML={{__html: responseMsg}}></div>
              <div>a: {activateNewUserState.activatedUser} b: {activateNewUserState.loggedInUser}</div>
            </Well>
            : null
          }
          {responseStatus === 2 ?
            <Well>
              <h3>Fehler bei der Bestätigung deines Accounts</h3>
              <div dangerouslySetInnerHTML={{__html: responseMsg}}></div>
            </Well>
            : null
          }
      </div>
    )
  }
}
