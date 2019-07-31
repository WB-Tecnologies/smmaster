import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import { getProofread } from '@/helpers/glvrd';

import './text-editor.sass';

const Inline = Quill.import('blots/inline');

class SpanBlock extends Inline {
  static create() {
    const node = super.create();
    node.setAttribute('class', 'glvrd-underline');
    return node;
  }
}

SpanBlock.blotName = 'glvrd-underline';
SpanBlock.tagName = 'em';
Quill.register(SpanBlock);

class TextEditor extends Component {
  static propTypes = {
    text: PropTypes.string,
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
      editor.formatText(range, 'glvrd-underline', 'api');
    });

    this.addListeners();
  }

  handleChange = (text, delta, source) => {
    // eslint-disable-next-line no-useless-return
    if (!this.reactQuillRef || source === 'api') return;

    // action to save text editPostText(text)
  }

  addListeners = () => {
    const qr = document.querySelectorAll('.glvrd-underline');
    const { hints } = this.state;

    qr.forEach((item, index) => {
      item.setAttribute('data-index', index);
      item.addEventListener('mouseenter', ({ target }) => {
        const currentIndex = parseInt(target.getAttribute('data-index'), 10);
        const newPosition = { top: target.offsetTop, left: target.offsetLeft };
        this.setState({
          hintContent: hints[currentIndex].hint.description,
          isVisibleHint: true,
          hintPosition: newPosition,
        });
      });
      item.addEventListener('mouseout', () => {
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
