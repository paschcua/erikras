require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Swiss React.js Community',
    description: 'Die erste Schweizer React.js Community <br /> Aktuelles, Tutorials, Community',
    head: {
      titleTemplate: 'Swiss React.js Community: %s',
      meta: [
        {name: 'description', content: 'Die erste Schweizer React.js Community!'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Die erste Schweizer React.js Community!'},
        {property: 'og:image', content: 'http://swiss-react.ch/logo.png'},
        {property: 'og:locale', content: 'de_DE'},
        {property: 'og:title', content: 'Swiss React.js Community'},
        {property: 'og:description', content: 'Die erste Schweizer React.js Community!'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@eaj'},
        {property: 'og:creator', content: '@eaj'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
