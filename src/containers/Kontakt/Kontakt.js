import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Kontakt extends Component {

  render() {
    const styles = require('./Kontakt.scss');
    return (
      <div className={styles.kontakt}>
        <div className="container">
          <h1>Kontakt...</h1>
          <Helmet title="Kontakt"/>
          <p>Kontakt will open soon...</p>
        </div>
      </div>
    );
  }

}
