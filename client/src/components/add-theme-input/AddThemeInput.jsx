import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@components/button/Button';
import FormInput from '@components/form-input/FormInput';

import cross from '!svg-url-loader?noquotes!../../../src/assets/Cross.svg';// eslint-disable-line import/no-webpack-loader-syntax
import check from '!svg-url-loader?noquotes!../../../src/assets/Check.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './add-theme.sass';

class AddThemeInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    closeBtnClick: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    closeBtnClick: () => {},
  };

  state = {
    text: '',
    errors: {
      text: '',
    },
  };

  handlerInput = ({ target: { value } }) => {
    this.setState({ text: value });
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { text, errors } = this.state;
    const { className, closeBtnClick } = this.props;
    const classes = classNames('add-theme', className);

    return (
      <form onSubmit={this.handleSubmit} className={classes}>
        <FormInput
          field="theme-name"
          value={text}
          error={errors.email}
          onChange={this.handlerInput}
          type="text"
          className="add-theme__input"
        />
        <div className="add-theme__btn-group">
          <Button isGhostIcon type="button" onClick={closeBtnClick}>
            <img src={cross} alt="close" />
          </Button>
          <Button
            isPrimaryIcon
            type="submit"
          >
            <img src={check} alt="apply" />
          </Button>
        </div>
      </form>
    );
  }
}
export default AddThemeInput;
