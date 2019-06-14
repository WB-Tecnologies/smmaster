import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormInput from '@/components/form-input/FormInput';
import Button from '@/components/button/Button';
import IconError from '@/components/icons/IconError';

import './login-form.sass';

const emailRegex = RegExp(/^[^\s]+@[^\s]/);

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
    isDisabled: false,
    isLoading: false,
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = ({ target: { name, value } }) => {
    const MIN_ALLOWED_PWD_LEN = 6;
    const { errors } = this.state;

    switch (name) {
      case 'email':
        errors.email = emailRegex.test(value) || value.length === 0
          ? ''
          : 'Некорректный адрес электронной почты';
        break;
      case 'password':
        errors.password = value.length < MIN_ALLOWED_PWD_LEN && value.length
          ? 'Используйте не менее 6 символов'
          : '';
        break;
      default:
        /* eslint-disable no-console */
        console.warn(`handleChange(): no handler for name: ${name}.`);
        break;
    }

    this.setState({
      errors,
      [name]: value,
      isDisabled: errors.email.length > 0 || errors.password.length > 0,
    });
  };

  render() {
    const {
      email, password, errors, isDisabled, isLoading,
    } = this.state;
    const { errorMsg } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="login-form__container">
            <FormInput
              field="email"
              label="Электронная почта"
              value={email}
              error={errors.email}
              onChange={this.handleChange}
              type="text"
              className="login-form__control"
            />
            {errorMsg && (
              <span className="login-form__error">
                <IconError />
                {errorMsg}
              </span>
            )}
            <FormInput
              field="password"
              label="Пароль"
              value={password}
              error={errors.password}
              onChange={this.handleChange}
              type="password"
              className="login-form__control login-form__control_hint"
            />
            <Button
              isPrimary
              isLarge
              isLoading={isLoading}
              type="submit"
              disabledPrimary={isDisabled}
              disabled={isDisabled}
            >
              Войти
            </Button>
            <div className="login-social-network">
              <p className="login-social-network__text">или через соцсети</p>
            </div>
          </div>
        </form>
        <div className="login-form__help">
          <a href="#test" className="login-form__help-text">
            <span>Забыли пароль?</span>
          </a>
          <a href="#test" className="login-form__help-text">
            <span>Зарегистрироваться</span>
          </a>
        </div>
      </>
    );
  }
}

LoginForm.propTypes = {
  errorMsg: PropTypes.string,
};

LoginForm.defaultProps = {
  errorMsg: '',
};

export default LoginForm;
