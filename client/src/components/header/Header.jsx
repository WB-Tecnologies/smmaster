import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Logo from '@/components/logo/Logo';
import Button from '@/components/button/Button';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@/components/button-dropdown/ButtonDropdown';

import userIcon from '!svg-url-loader?noquotes!../../../src/assets/Account.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './header.sass';

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
            <ButtonDropdown>
              <DropdownToggle>
                <img src={userIcon} alt="user-icon" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Редактировать профиль</DropdownItem>
                <DropdownItem>Выход</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
