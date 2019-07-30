import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

class TextEditor extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '',
  }

  render() {
    const { text } = this.props;

    return (
      <ReactQuill
        value={text}
        onChange={this.handleChange}
        theme="bubble"
      />
    );
  }
}

export default TextEditor;
