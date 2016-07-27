import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Hello extends Component {

  componentDidMount() {
      setTimeout(() => {

        var pg = require('pg');

        pg.defaults.ssl = true;
        pg.connect(process.env.DATABASE_URL, function(err, conn) {
          if (err) throw err;
          console.log('Connected to postgres! Getting schemas...');

          conn
            .query('SELECT table_schema,table_name FROM information_schema.tables;')
            .on('row', function(row) {
              console.log(JSON.stringify(row));
            });
        });

      }, 100);
  }

  render() {
    return (
      <div className="container">
        <h1>Hello, Dude!!</h1>
        <Helmet title="Hello Dude GO GO"/>
        Have a wondeful day!!!!!! GO GO GO
      </div>
    );
  }

}
