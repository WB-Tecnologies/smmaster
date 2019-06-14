import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAuthUser } from '@helpers/requests';

import Logo from '@components/logo/Logo';
import LoginForm from './login-form/LoginForm';

import './login-container.sass';

class LoginContainer extends PureComponent {
  componentDidMount() {
    const { user, history } = this.props;

    if (isAuthUser(user)) {
      history.push('/');
    }
  }

  render() {
    const { history } = this.props;

    return (
      <div className="container">
        <main className="login-main">
          <div className="login-main__container">
            <div className="login-main__logo">
              <Logo link="/login" />
            </div>
            <div className="login-main__form">
              <LoginForm history={history} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.objectOf(PropTypes.string),
};

LoginContainer.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: state.authorization.user,
});

export default connect(
  mapStateToProps,
  null,
)(LoginContainer);
