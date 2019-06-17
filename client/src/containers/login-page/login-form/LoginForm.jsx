import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authAction } from '@/actions/authActions';

import FormInput from '@/components/form-input/FormInput';
import Button from '@/components/button/Button';
import IconError from '@/components/icons/IconError';
import Insta from '@/components/icons/social/Instagram';
import VK from '@/components/icons/social/VK';
import FB from '@/components/icons/social/FB';
import TW from '@/components/icons/social/TW';

import './login-form.sass';

const emailRegex = RegExp(/^[^\s]+@[^\s]/);

const isFormValid = ({ errors, ...rest }) => {
  let isValid = true;

  isValid = !Object.values(errors).some(val => (val.length !== 0));

  isValid = !Object.values(rest).some(val => (val === null));

  return isValid;
};

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
    const { authAction, history } = this.props;
    const { email, password } = this.state;

    this.setState({ isLoading: true });

    if (isFormValid(this.state)) {
      authAction({ email, password }).then(isRedirectNeeded => {
        if (isRedirectNeeded) {
          history.push('/');
        } else {
          this.setState({ isLoading: false });
        }
      });
    } else {
      /* eslint-disable no-console */
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const MIN_ALLOWED_PWD_LEN = 6;
    const { errors } = this.state;

    switch (name) {
      case 'email':
        errors.email = emailRegex.test(value) || value.length === 0
          ? ''
          : 'Некорректный e-mail';
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
              isPrimaryLg
              isLoading={isLoading}
              type="submit"
              disabledPrimary={isDisabled}
              disabled={isDisabled}
            >
              Войти
            </Button>
            <div className="login-social-network">
              <p className="login-social-network__text">или через соцсети</p>
              <div className="login-social-network__btn">
                <Button href="#" isGhost isIcon><VK width={30} /></Button>
                <Button href="#" isGhost isIcon><FB width={30} /></Button>
                <Button href="#" isGhost isIcon><TW width={30} /></Button>
                <Button href="#" isGhost isIcon><Insta width={30} /></Button>
              </div>
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
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  authAction: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
};

LoginForm.defaultProps = {
  errorMsg: '',
};

const mapStateToProps = state => ({
  errorMsg: state.authorization.error,
});

const mapDispatchToProps = dispatch => ({
  authAction: data => dispatch(authAction({ ...data })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
