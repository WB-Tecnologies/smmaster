/* eslint-disable import/no-webpack-loader-syntax */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { addPost } from '@actions/contentPlanActions';

import Button from '@components/button/Button';
import FormInput from '@components/form-input/FormInput';

import cross from '!svg-url-loader?noquotes!../../../src/assets/Cross.svg';
import check from '!svg-url-loader?noquotes!../../../src/assets/Check.svg';

import './add-theme.sass';

class AddThemeInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    closeBtnClick: PropTypes.func,
    addPost: PropTypes.func,
    date: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    className: '',
    closeBtnClick: () => {},
    addPost: () => {},
    date: {},
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
    const { addPost, date } = this.props;
    const { text } = this.state;

    addPost(text, date);
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
            <img src={check} alt="approve" />
          </Button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: (data, date) => dispatch(addPost(data, date)),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddThemeInput);
