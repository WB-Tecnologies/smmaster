import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './header.sass';

import Logo from '@components/logo/Logo';
import Button from '@components/button/Button';

class Header extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '',
  }

  render() {
    const { title } = this.props;

    return (
      <header className="header">
        <div className="container">
          <div className="header__content container-p">
            <Logo link="/" className="header__logo" />
            <div className="header__breadcrumb">{title}</div>
            <Button
              isPrimary
              isPrimaryMd
              type="button"
              className="header__btn"
            >
              Новая публикация
            </Button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
