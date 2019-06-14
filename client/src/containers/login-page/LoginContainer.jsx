import React, { PureComponent } from 'react';

import Logo from '@components/logo/Logo';
import LoginForm from './login-form/LoginForm';

import './login-container.sass';

class LoginContainer extends PureComponent {
  render() {
    return (
      <div className="container">
        <main className="login-main">
          <div className="login-main__container">
            <div className="login-main__logo">
              <Logo link="/login" />
            </div>
            <div className="login-main__form">
              <LoginForm />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default LoginContainer;
