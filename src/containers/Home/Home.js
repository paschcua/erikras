import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-async-connect';
/* { import { Link } from 'react-router'; } */
/* { import { CounterButton } from 'components'; } */
import config from '../../config';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];
    promises.push(window.localStorage.getItem('ls_username'));

    return Promise.all(promises);
  }
}])

export default class Home extends Component {

  static propTypes = {
    userLoggedIn: PropTypes.string
  };

  render() {
    const styles = require('./Home.scss');
    const {userLoggedIn} = this.props;
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
                {userLoggedIn !== null ?
                  userLoggedIn
                  :
                  'AHA NO'
                }
              </p>
            </div>
            <h1>{config.app.title}</h1>
            <h2>{config.app.description}</h2>
            <h2>{config.app.subdescription}</h2>
          </div>
        </div>

        <div className="container">
          { /* {
          <div className={styles.counterContainer}>
            <CounterButton multireducerKey="counter1"/>
            <CounterButton multireducerKey="counter2"/>
            <CounterButton multireducerKey="counter3"/>
          </div>
          } */
          }

          <h3>Neuste Blogeinträge</h3>

          <h2>
            React-Applikation produktiv auf Heroku publizieren (Node.js, Express.js, Heroku)
          </h2>

        </div>
      </div>
    );
  }
}
