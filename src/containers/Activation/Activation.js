import React, {Component} from 'react';
import Well from 'react-bootstrap/lib/Well';
import Helmet from 'react-helmet';
import superagent from 'superagent';
import cookie from 'react-cookie';

export default class Activation extends Component {
  state = {
    responseStatus: 0,
    responseMsg: ''
  }

  /*componentWillMount() {
    superagent
    .get('/activation')
    .end((error, res) => {
      console.log(JSON.stringify(res, error));
      if (res.body.status === 1) {
        this.setState({responseStatus: 1});
        this.setState({responseMsg: 'Dein Account wurde erfolgreich bestätigt! Herzlich willkommen bei der Swiss React Community! '});
        cookie.save('ck_status', true, { expires: new Date(new Date().getTime() + (3600*3600*3600)) });
      } else {
        this.setState({responseStatus: 2});
        this.setState({responseMsg: 'Es liegt ein Fehler mit der Bestätigung deines Accounts vor, bitte versuche es später nochmals! '});
        cookie.save('ck_status', false, { expires: new Date(new Date().getTime() + (3600*3600*3600)) });
      }
    });
  }*/

  render() {
    const {responseMsg, responseStatus} = this.state;
    return (
      <div className="container">
        <Helmet title="Aktivierung"/>
          {responseStatus === 0 ?
              <h3>Fehler: Seite existiert nicht</h3>
            : null
          }
          {responseStatus === 1 ?
            <Well>
              <h3>Erfolgreich Account bestätigt</h3>
              <div dangerouslySetInnerHTML={{__html: responseMsg}}></div>
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
