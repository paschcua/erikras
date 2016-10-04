import React, {Component} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
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
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    const {loginEmail} = this.state;
    return (
      <div className="container">
        <h1>Community</h1>
        <Helmet title="Community"/>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
