import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';
import cookieParser from 'cookie-parser';

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://'+config.app.settings.SenderEmail+':'+config.app.settings.SenderEmailPw+'@'+config.app.settings.SenderEmailSMTPHost);

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});


/* **** Mongoose */
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
var userSchema = new mongoose.Schema({
  uuid: String,
  email: String,
  password: String,
  activation: Boolean
});
var UserModel = mongoose.model('User', userSchema);

var blogSchema = new mongoose.Schema({
  userEmail: String,
  markup: String
});
var BlogModel = mongoose.model('Blog', blogSchema);


app.use(cookieParser()); // use cookieParser for User-Cookies

/* **** Body Parser */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/* **** Get POST Form data from Registration */
app.post('/registrieren', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    var dateObject = new Date();
    var uniqueId =
         dateObject.getFullYear() + '' +
         dateObject.getMonth() + '' +
         dateObject.getDate() + '' +
         dateObject.getTime();

    var uuid = uniqueId+Math.random();

    var UserData = new UserModel({
      uuid: uuid,
      email: email,
      password: password,
      activation: false
    });

    UserModel.findOne({ email: email }, 'email', function(error, result){
        if(error){
            res.json(error);
        }
        else if(result == null){
            UserData.save(function (err) {
              if (err) return console.log(err);
            });
            var mailOptions = {
                from: '"Swiss React Community: Registrierung" <info@swiss-react.ch>',
                to: email,
                subject: 'Willkommen bei der Swiss React Community',
                text: 'Registrierung bestätigen',
                html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>Willkommen bei Swiss-React.ch</title></head><body bgcolor="#8d8e90"><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#8d8e90"> <tr> <td><table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" align="center"> <tr> <td><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="61"><a href="//www.swiss-react.ch" target="_blank"><img src="https://s3.eu-central-1.amazonaws.com/swiss-react.ch/resources/img/PROMO-GREEN2_01_01.jpg" width="61" height="76" border="0" alt=""/></a></td><td width="144"><a href="//www.swiss-react.ch" target="_blank"><img src="https://s3.eu-central-1.amazonaws.com/swiss-react.ch/resources/img/PROMO-GREEN2_01_02.jpg" width="144" height="76" border="0" alt=""/></a></td><td width="393"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td height="30"><img src="https://s3.eu-central-1.amazonaws.com/swiss-react.ch/resources/img/PROMO-GREEN2_01_04.jpg" width="393" height="30" border="0" alt=""/></td></tr></table></td></tr></table></td></tr><tr> <td align="center">&nbsp;</td></tr><tr> <td>&nbsp;</td></tr><tr> <td><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="10%">&nbsp;</td><td width="80%" align="left" valign="top"><font style="font-family: Georgia, Times, serif; color:#010101; font-size:24px"><strong><em>Willkommen bei Swiss-React.ch</em></strong></font><br/><br/> <font style="font-family: Verdana, Geneva, sans-serif; color:#666766; font-size:13px; line-height:21px">Wir freuen uns, dass du dich unserer Community anschliesst!<br/><br/>Bestätige bitte deine Registrierung mit dem untenstehenden Link:<br/><a href="http://www.swiss-react.ch/activation/?m='+email+'&u='+uuid+'">Anmeldung bestätigen</a><br/><br/>Freundliche Grüsse und willkommen an Bord,<br/>Swiss React Team</font></td><td width="10%">&nbsp;</td></tr></table></td></tr><tr> <td>&nbsp;</td></tr><tr> <td>&nbsp;</td></tr><tr> <td><img src="https://s3.eu-central-1.amazonaws.com/swiss-react.ch/resources/img/PROMO-GREEN2_07.jpg" width="598" height="7" style="display:block" border="0" alt=""/></td></tr><tr> <td>&nbsp;</td></tr><tr> <td align="center"><font style="font-family: Helvetica, Arial, sans-serif; color:#231f20; font-size:8px"><strong>Swiss React Community by Emma &amp; John | www.emmaandjohn.ch </strong></font></td></tr><tr> <td>&nbsp;</td></tr></table></td></tr></table></body></html>'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
            res.json({ status: 1, uuid: uuid });
        }
        else{
            res.json({ status: 0 });
        }
    });
});


/* **** Get POST Form data from Registration */
app.post('/login', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    UserModel.findOne({ email: email, password: password }, 'email', function(error, result){
        if(error){
            res.json(error);
        }
        else if(result !== null){
            res.json({ status: 1 });
        }
        else{
            res.json({ status: 0 });
        }
    });
});


/* **** Activation User */
app.post('/activation', function(req, res) {
    var queryM = req.body.queryM;
    var queryU = req.body.queryU;

    var query = {"email": queryM, "uuid": queryU};
    var update = {activation: true};
    var options = {new: true};
    UserModel.findOneAndUpdate(query, update, options, function(err, person) {
      if (err) {
        console.log('activation: got an error');
        res.json({ status: 0 });
      } else {
        res.json({ status: 1 });
      }
    });
});

/* **** Save new User-Post-Entry to database/mongoose */
app.post('/community', function(req, res) {
    var markupData = req.body.markupData;
    var userEmail = req.body.userEmail;

    var BlogData = new BlogModel({
      userEmail: userEmail,
      markup: markupData
    });
    UserModel.findOne({ email: userEmail }, 'email', function(error, result){
        if(error){
            res.json(error);
        }
        else if(result == null){
        }
        else{ /* Success: Save data to mongoose */
          BlogData.save(function (err) {
            if (err) return console.log(err);
          });
          res.json({ status: 1, blogEntry: markupData });
        }
    });
});




app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
