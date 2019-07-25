import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { getSocialIcons } from '@/helpers/socialIcons';
import { checkAccount, selectRubric } from '@/actions/postDetailsActions';

import Portal from '@/components/portal/Portal';
import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import Select from '@/components/select/Select';

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
    isLoading: PropTypes.bool,
    checkAccount: PropTypes.func.isRequired,
    selectRubric: PropTypes.func.isRequired,
  };

  static defaultProps = {
    post: {
      rubricColor: '#E3E7EB',
      accounts: [],
    },
    onCancel: () => {},
    isOpen: false,
    isLoading: false,
  };

  constructor(props) {
    super(props);

    this.socialIcons = getSocialIcons({ size: 16 });
  }

  handleCheck = id => {
    const { checkAccount } = this.props;

    checkAccount(id);
  }

  handleSelect = id => {
    const { selectRubric } = this.props;

    selectRubric(id);
  }

  renderSocialIcon = socialMedia => {
    if (socialMedia in this.socialIcons) {
      return <span className="post__account-social-icon">{this.socialIcons[socialMedia]}</span>;
    }
  };

  renderAccount = accounts => {
    const accountsIsLonger = accounts.length > MAX_ACCOUNT_TO_SHOW;
    const moreAccounts = accounts.length - MAX_ACCOUNT_TO_SHOW;
    accounts = accountsIsLonger ? accounts.slice(0, MAX_ACCOUNT_TO_SHOW) : accounts;

    return (
      <>
        {accounts.map(({
          id,
          avatar,
          socialMedia,
          isChecked,
        }) => (
          <li key={shortid.generate()} className="post__account">
            <Checkbox
              onChange={() => { this.handleCheck(id); }}
              id={id}
              isChecked={isChecked}
            >
              <img src={avatar} alt="implementer" className="post__account-img" />
              {this.renderSocialIcon(socialMedia)}
            </Checkbox>
          </li>
        ))}
        {accountsIsLonger && <li className="post__account"><div className="post__account-img_more">{`+${moreAccounts}`}</div></li>}
      </>
    );
  };

  renderPostContent = () => {
    const {
      onCancel,
      post: {
        accounts,
        rubrics,
      },
    } = this.props;

    return (
      <div className="post__container">
        <header className="post__header">
          <h2 className="post__title">Редактирование публикации</h2>
          <Button isGhostIcon onClick={onCancel} className="post__close-btn">
            <img src={cross} alt="close" />
          </Button>
        </header>
        <div className="post__accounts">
          {this.renderAccount(accounts)}
        </div>
        <div className="post__body">
          <main className="post__content">
            <p>text</p>
          </main>
          <aside className="post__aside">
            <div>Время публикации</div>
            <div className="post__rubric">
              <Select headerTitle="Без рубрики" dotColor="#E3E7EB" list={rubrics} onClick={this.handleSelect} />
            </div>
            <div>Тема</div>
            <div>Примеры</div>
          </aside>
        </div>
        <footer className="post__footer">
          <Button isOutline>Удалить</Button>
          <div className="post__footer-btn-group">
            <Button isOutline className="post__footer-btn-cancel">Отмена</Button>
            <Button isPrimary isPrimaryMd>Запланировать</Button>
          </div>
        </footer>
      </div>
    );
  }

  render() {
    const {
      isOpen,
      isLoading,
    } = this.props;

    return (
      isOpen && (
        <Portal>
          <div className="post-overlay">
            <div className="post">
              {isLoading
                ? <span className="post__spinner" />
                : (this.renderPostContent())
              }
            </div>
          </div>
        </Portal>
      )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkAccount: id => dispatch(checkAccount(id)),
  selectRubric: id => dispatch(selectRubric(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Post);
