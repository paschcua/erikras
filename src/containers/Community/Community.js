import React, {Component} from 'react';
import Editor from 'draft-js-editor'
import Helmet from 'react-helmet';
import cookie from 'react-cookie';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    registerNewUserState: store.registerNewUser.user,
  };
})

export default class MyEditor extends Component {
  state = {
    loginEmail: cookie.load('ck_email')
  }

  render() {
    const style = require('./Community.scss');
    const {loginEmail} = this.state;
    return (
      <div className="container">
        <h1>Community</h1>
        <Helmet title="Community"/>
        <div>
              A sample text editor
              <Editor
                onChange={(editorState) => this.setState({ editorState })}
                editorState={this.state.editorState}
              />
            </div>
      </div>
    );
  }
}
