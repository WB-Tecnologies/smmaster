/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import debounce from 'lodash.debounce';

import { getProofread } from '@/helpers/glvrd';

import Tooltip from '@/components/tooltip/Tooltip';

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
    getDataFromChildComponent: PropTypes.func,
  }

  static defaultProps = {
    text: '',
    getDataFromChildComponent: () => {},
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

    const quill = ReactDOM.findDOMNode(this.reactQuillRef).querySelector('.ql-editor');
    quill.addEventListener('mousemove', debounce(this.handleMouseMove, 150));
  }

  componentDidUpdate() {
    const { hints } = this.state;
    const { getDataFromChildComponent } = this.props;
    const editor = this.reactQuillRef.getEditor();

    hints.forEach(({ start, end }) => {
      const range = { index: start, length: end - start };
      editor.formatText(range, 'glvrd-hint', 'api');
    });

    getDataFromChildComponent(hints);

    this.setDataIndices();
  }

  handleChange = (text, delta, source, editor) => {
    const { editPostText } = this.props;

    if (!this.reactQuillRef || source === 'api') return;

    editPostText(text);
    getProofread(editor.getText(), fragments => {
      this.setState({ hints: fragments });
    });
  }

  setDataIndices = () => {
    const glvrdHint = document.querySelectorAll('.glvrd-hint');

    glvrdHint.forEach((hint, index) => {
      hint.setAttribute('data-index', index);
    });
  }

  handleMouseMove = ({ target }) => {
    if (target.tagName !== 'EM') {
      this.setState({ isVisibleHint: false });
      return;
    }
    const { isVisibleHint, hints } = this.state;

    if (isVisibleHint) return;

    const currentIndex = parseInt(target.getAttribute('data-index'), 10);

    const container = document.querySelector('.quill').parentElement;
    const quill = document.querySelector('.quill').getBoundingClientRect();
    const bodyRect = container.getBoundingClientRect();
    const elemRect = target.getBoundingClientRect();
    const offsetTop = elemRect.top - quill.top;
    const offsetBottom = bodyRect.height - offsetTop;
    const offsetLeft = elemRect.left - bodyRect.left;
    const newPosition = { bottom: offsetBottom, left: offsetLeft };

    this.setState({
      hintContent: hints[currentIndex].hint.description,
      isVisibleHint: true,
      hintPosition: newPosition,
    });
  }

  render() {
    const { text } = this.props;
    const { isVisibleHint, hintContent, hintPosition } = this.state;

    return (
      <>
        <Tooltip position={hintPosition} isVisible={isVisibleHint} content={hintContent} />
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
