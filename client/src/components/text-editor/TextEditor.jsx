import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { getProofread } from '@/helpers/glvrd';

import './text-editor.sass';

const Inline = Quill.import('blots/inline');

class EmBlock extends Inline {
  static create() {
    const node = super.create();
    node.setAttribute('class', 'glvrd-hint');
    return node;
  }
}

EmBlock.blotName = 'glvrd-hint';
EmBlock.tagName = 'em';
Quill.register(EmBlock);

class TextEditor extends Component {
  static propTypes = {
    text: PropTypes.string,
    editPostText: PropTypes.func.isRequired,
  }

  static defaultProps = {
    text: '',
  }

  state = {
    hints: [],
    isVisibleHint: false,
    hintContent: '',
    hintPosition: {
      top: 0,
      left: 0,
    },
  }

  componentDidMount() {
    const { text } = this.props;

    getProofread(text, fragments => {
      this.setState({ hints: fragments });
    });
  }

  componentDidUpdate() {
    const { hints } = this.state;
    const editor = this.reactQuillRef.getEditor();

    hints.forEach(({ start, end }) => {
      const range = { index: start, length: end - start };
      editor.formatText(range, 'glvrd-hint', 'api');
    });

    this.addListeners();
  }

  handleChange = (text, delta, source, editor) => {
    const { editPostText } = this.props;

    if (!this.reactQuillRef || source === 'api') return;

    editPostText(text);
    getProofread(editor.getText(), fragments => {
      this.setState({ hints: fragments });
    });
  }

  addListeners = () => {
    const glvrdHint = document.querySelectorAll('.glvrd-hint');
    const { hints } = this.state;

    glvrdHint.forEach((hint, index) => {
      hint.setAttribute('data-index', index);
      hint.addEventListener('mouseenter', ({ target }) => {
        const { isVisibleHint } = this.state;

        if (isVisibleHint) return;

        const currentIndex = parseInt(target.getAttribute('data-index'), 10);
        const newPosition = { top: target.offsetTop, left: target.offsetLeft };

        this.setState({
          hintContent: hints[currentIndex].hint.description,
          isVisibleHint: true,
          hintPosition: newPosition,
        });
      });
      hint.addEventListener('mouseleave', () => {
        this.setState({ isVisibleHint: false });
      });
    });
  }

  render() {
    const { text } = this.props;
    const { isVisibleHint, hintContent, hintPosition } = this.state;

    return (
      <>
        <div
          className={classNames('tooltip', { tooltip_visible: isVisibleHint })}
          style={hintPosition}
        >
          {hintContent}
        </div>
        <ReactQuill
          ref={el => { this.reactQuillRef = el; }}
          value={text}
          onChange={this.handleChange}
          theme="bubble"
        />
      </>
    );
  }
}

export default TextEditor;
