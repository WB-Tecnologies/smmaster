import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { getSocialIcons } from '@/helpers/socialIcons';

import Portal from '@/components/portal/Portal';
import Button from '@/components/button/Button';

import cross from '!svg-url-loader?noquotes!../../../src/assets/Cross.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './post.sass';

const MAX_ACCOUNT_TO_SHOW = 10;

class Post extends PureComponent {
  static propTypes = {
    post: PropTypes.shape({
      accounts: PropTypes.arrayOf(PropTypes.object),
    }),
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
  };

  static defaultProps = {
    post: {
      rubricColor: '#E3E7EB',
      accounts: [],
    },
    onCancel: () => {},
    isOpen: false,
  };

  renderSocialIcon = socialMedia => {
    const socialIcons = getSocialIcons(16);
    if (socialMedia in socialIcons) {
      return <span className="post__account-social-icon">{socialIcons[socialMedia]}</span>;
    }
  };

  renderAccount = accounts => {
    const accountsIsLonger = accounts.length > MAX_ACCOUNT_TO_SHOW;
    const moreAccounts = accounts.length - MAX_ACCOUNT_TO_SHOW;
    accounts = accountsIsLonger ? accounts.slice(0, 4) : accounts;

    return (
      <>
        {accounts.map(({ avatar, socialMedia }) => (
          <li key={shortid.generate()} className="post__account">
            <img src={avatar} alt="implementer" className="post__account-img" />
            {this.renderSocialIcon(socialMedia)}
          </li>
        ))}
        {accountsIsLonger && <li className="post__account"><div className="post__account-img_more">{`+${moreAccounts}`}</div></li>}
      </>
    );
  };

  render() {
    const {
      isOpen,
      onCancel,
      post: {
        accounts,
      },
    } = this.props;

    return (
      isOpen && (
        <Portal>
          <div className="post-overlay">
            <div className="post">
              <div className="post__container">
                <div className="post__header">
                  <h2 className="post__title">Редактирование публикации</h2>
                  <Button isGhostIcon onClick={onCancel} className="post__close-btn">
                    <img src={cross} alt="close" />
                  </Button>
                </div>
                <div className="post__accounts">
                  {this.renderAccount(accounts)}
                </div>
                <div className="post__body">
                    текст
                </div>
                <div className="post__footer">
                  <Button isOutline>Удалить</Button>
                  <div className="post__footer-btn-group">
                    <Button isOutline className="post__footer-btn-cancel">Отмена</Button>
                    <Button isPrimary isPrimaryMd>Запланировать</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )
    );
  }
}

export default Post;
