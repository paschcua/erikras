import React, {Component} from 'react';
import Helmet from 'react-helmet';


export default class Register extends Component {

  render() {
    return (
      <div className="container">
        <h1>Register today and be a part of the Swiss React Community!</h1>
        <Helmet title="Register"/>
        <p>Registration will open soon...</p>
      </div>
    )
  }

}
