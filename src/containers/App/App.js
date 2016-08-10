import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})

  export default class App extends Component {
    static propTypes = {
      children: PropTypes.object.isRequired,
      user: PropTypes.object,
      logout: PropTypes.func.isRequired,
      pushState: PropTypes.func.isRequired
    };

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    state = {
      navExpanded: false,
      loginStatus: false,
      loginUsername: false
    }

    componentWillMount() {
      let aaa = window.localStorage.getItem('ls_username');
      console.log(aaa);
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.user && nextProps.user) {
        // login
        this.props.pushState('/loginSuccess');
      } else if (this.props.user && !nextProps.user) {
        // logout
        this.props.pushState('/');
      }
    }

    onNavItemClick = () => {
      this.setState({ navExpanded: false });
    }
    onNavbarToggle = () => {
      this.setState({ navExpanded: ! this.state.navExpanded });
    }
    handleLogout = (event) => {
      event.preventDefault();
      this.props.logout();
    };


    render() {
      const {user, loginStatus, loginUsername} = this.state;
      const styles = require('./App.scss');

      return (
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          <Navbar fixedTop expanded={ this.state.navExpanded } onToggle={ this.onNavbarToggle }>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" activeStyle={{color: '#d52b1e'}}>
                  <div className={styles.brand}/>
                  <span>{config.app.title}</span>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>

            <Navbar.Collapse>
              <Nav navbar>
                <LinkContainer to="/community">
                  <NavItem eventKey={1} onClick={ this.onNavItemClick }>Community</NavItem>
                </LinkContainer>
                <LinkContainer to="/registrieren">
                  <NavItem eventKey={2} onClick={ this.onNavItemClick }>Mitglied werden</NavItem>
                </LinkContainer>
                <LinkContainer to="/kontakt">
                  <NavItem eventKey={3} onClick={ this.onNavItemClick }>Kontakt</NavItem>
                </LinkContainer>
                {loginStatus ?
                  <div dangerouslySetInnerHTML={{__html: loginUsername}}></div>
                  : null
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div className={styles.appContent}>
            {this.props.children}
          </div>
          <InfoBar/>

          <div className="well text-center">
            Copyright 2016 | Swiss React Community | React, Redux, Flux, React Native | Swiss-react.ch
          </div>
        </div>
      );
    }
  }
