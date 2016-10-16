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
import cookie from 'react-cookie';
import Loader from 'react-loader-advanced';

import { getUser } from '../../redux/actions/getUserActions';

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

@connect((store) => {
  return {
    registerNewUserState: store.registerNewUser.user,
    getUserState: store.getUser.user,
    activateNewUserState: store.activateNewUser.userStatus,
  };
})

export default class App extends Component {
    state = {
      navExpanded: false
    }

    static propTypes = {
      children: PropTypes.object.isRequired,
      user: PropTypes.object,
      logout: PropTypes.func.isRequired,
      pushState: PropTypes.func.isRequired
    };

    static contextTypes = {
      store: PropTypes.object.isRequired
    };

    componentWillMount() {
      console.log("component componentDidMount ----------------");
      const ck_activation = cookie.load('ck_activation');
      const ck_email = cookie.load('ck_email');
      const ck_pw = cookie.load('ck_pw');
      const ck_uuid = cookie.load('ck_uuid');

      this.props.dispatch(getUser(ck_activation, ck_email, ck_pw, ck_uuid));
    }

    componentWillReceiveProps(nextProps) {
      console.log("component componentWillReceiveProps ----------------");
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
    }

    render() {
      const styles = require('./App.scss');
      const { registerNewUserState, getUserState, activateNewUserState } = this.props;
      //const loader = <span><img src="../Home/loader.gif" width="30" height="30" /></span>;

      return (
        <div className={styles.app}>
          <Helmet {...config.app.head}/>
          <div className="preload-images"></div>
          <Loader show={getUserState.loading}>
          <Navbar fixedTop expanded={ this.state.navExpanded } onToggle={ this.onNavbarToggle }>
            <Navbar.Header>
              <Navbar.Brand>
                <IndexLink to="/" activeStyle={{color: '#d52b1e'}}>
                  <div className={styles.brand}/>
                  <span>
                    {config.app.title}
                  </span>
                </IndexLink>
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav navbar>
                  <LinkContainer to="/community">
                    <NavItem eventKey={1} onClick={ this.onNavItemClick }>Community</NavItem>
                  </LinkContainer>
                  { getUserState.activation === true || activateNewUserState.activatedUser === true ?
                  <LinkContainer to="/registrieren">
                    <NavItem eventKey={2} onClick={ this.onNavItemClick }>Mein Profil</NavItem>
                  </LinkContainer>
                  :
                  <LinkContainer to="/registrieren0">
                    <NavItem eventKey={2}>Mitmachen</NavItem>
                  </LinkContainer>
                  }
                  <LinkContainer to="/kontakt">
                    <NavItem eventKey={3}>Kontakt</NavItem>
                  </LinkContainer>
                  { getUserState.activation === true || activateNewUserState.activatedUser === true ?
                  <LinkContainer to="/registrieren1">
                    <NavItem eventKey={4}>Logout</NavItem>
                  </LinkContainer>
                  :
                  <LinkContainer to="/registrieren1">
                    <NavItem eventKey={4}>Login</NavItem>
                  </LinkContainer>
                  }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          </Loader>

          <div className={styles.appContent}>
            {this.props.children}
          </div>
          <InfoBar/>

          <div className="well text-center">
            Copyright { new Date().getFullYear() } | Swiss React Community | React, Redux, Flux, React Native | Swiss-react.ch
          </div>
        </div>
      );
    }
  }
