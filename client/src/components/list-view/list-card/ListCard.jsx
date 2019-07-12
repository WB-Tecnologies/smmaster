/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';
import TextTruncate from 'react-text-truncate';

import { getTime } from '@/helpers/formatDate';

import Button from '@components/button/Button';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@/components/button-dropdown/ButtonDropdown';

import verticalDots from '!svg-url-loader?noquotes!../../../../src/assets/verticalDots.svg';// eslint-disable-line import/no-webpack-loader-syntax

import { getSocialIcons } from './socialIcons';

// while doesn't have backend
import pic1 from '@/assets/pic1.png';
import pic2 from '@/assets/pic2.png';
import pic3 from '@/assets/pic3.png';
import avatar from '@/assets/avatar.jpg';

import './list-card.sass';

const MAX_ACCOUNT_TO_SHOW = 4;

class ListCard extends PureComponent {
  static propTypes = {
    time: PropTypes.objectOf(PropTypes.string),
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      rubricColor: PropTypes.string,
      isEmpty: PropTypes.bool.isRequired,
      accounts: PropTypes.arrayOf(PropTypes.object),
    }),
    className: PropTypes.string,
  };

  static defaultProps = {
    time: '00:00',
    post: {
      rubricColor: '#E3E7EB',
      accounts: [],
    },
    className: '',
  };

  renderSocialIcon = socialMedia => {
    const socialIcons = getSocialIcons(16);
    if (socialMedia in socialIcons) {
      return <span className="list-card__account-social-icon">{socialIcons[socialMedia]}</span>;
    }
  };

  renderAccount = accounts => {
    const accountsIsLonger = accounts.length > MAX_ACCOUNT_TO_SHOW;
    const moreAccounts = accounts.length - MAX_ACCOUNT_TO_SHOW;
    accounts = accountsIsLonger ? accounts.slice(0, 4) : accounts;

    return (
      <>
        {accounts.map(({ avatar, socialMedia }) => (
          <li key={shortid.generate()} className="list-card__account">
            <img src={avatar} alt="implementer" className="list-card__account-img" />
            {this.renderSocialIcon(socialMedia)}
          </li>
        ))}
        {accountsIsLonger && <li className="list-card__account"><div className="list-card__account-img_more">{`+${moreAccounts}`}</div></li>}
      </>
    );
  };

  renderAttachments = attachments => (
    attachments.map(({ img, alt }) => (
      <li className="list-card__attachment"><img src={img} className="list-card__attachment-img" alt={alt} /></li>
    ))
  )

  render() {
    const {
      post: {
        accounts,
        title,
        rubricColor,
        isEmpty,
        descr,
        attachments,
      },
      time,
      className,
    } = this.props;
    const classes = classNames(
      'list-card',
      className,
      { 'list-card_empty': isEmpty },
    );
    return (
      <div className={classes}>
        <div className="list-card__container">
          <div className="list-card__oval" style={{ backgroundColor: rubricColor }} />
          <div className="list-card__header">
            <h3 className="list-card__title">{title}</h3>
          </div>
          <div className="list-card__body">
            <div className="list-card__time">{getTime(time)}</div>
            <ul className="list-card__accounts">
              {this.renderAccount(accounts)}
            </ul>
          </div>
          <div className="list-card__descr">
            <TextTruncate
              line={4}
              className="list-card__descr-text"
              truncateText="…"
              text={descr}
            />
          </div>
          <ul className="list-card__attachments">
            {this.renderAttachments(attachments)}
          </ul>
        </div>
        <div className="list-card__controls">
          <Button isOutline type="button" className="list-card__btn">
            Редактировать
          </Button>
          <ButtonDropdown className="list-card__btn-dropdown">
            <DropdownToggle>
              <img src={verticalDots} alt="user-icon" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Редактировать профиль</DropdownItem>
              <DropdownItem>Выход</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}
export default ListCard;
