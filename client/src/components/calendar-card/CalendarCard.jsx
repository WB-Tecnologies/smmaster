import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import { getTime } from '@/helpers/formatDate';
import { getSocialIcons } from '@/helpers/socialIcons';
import { fetchPost } from '@/actions/postDetailsActions';

import Post from '@/components/post/Post';

import './calendar-card.sass';

// while doesn't have backend
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
import avatar from '../../../src/assets/avatar.jpg';

const MAX_ACCOUNT_TO_SHOW = 4;

class CalendarCard extends PureComponent {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    postDetails: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.objectOf(PropTypes.string),
      accounts: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
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

  state = {
    isOpen: false,
  }

  handleDisplayPost = () => {
    const { fetchPost } = this.props;

    fetchPost();
    this.setState({ isOpen: true });
  }

  handleSubmit = () => {
    this.setState({ isOpen: false });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  renderSocialIcon = socialMedia => {
    const socialIcons = getSocialIcons(7);
    if (socialMedia in socialIcons) {
      return <span className="calendar-card__account-social-icon">{socialIcons[socialMedia]}</span>;
    }
  };

  renderAccount = accounts => {
    const accountsIsLonger = accounts.length > MAX_ACCOUNT_TO_SHOW;
    const moreAccounts = accounts.length - MAX_ACCOUNT_TO_SHOW;
    accounts = accountsIsLonger ? accounts.slice(0, 4) : accounts;

    return (
      <>
        {accounts.map(({ avatar, socialMedia }) => (
          <li key={shortid.generate()} className="calendar-card__account">
            <img src={avatar} alt="implementer" className="calendar-card__account-img" />
            {this.renderSocialIcon(socialMedia)}
          </li>
        ))}
        {accountsIsLonger && <li className="calendar-card__account"><div className="calendar-card__account-img_more">{`+${moreAccounts}`}</div></li>}
      </>
    );
  };

  renderPost = () => {
    const { isOpen } = this.state;
    const { postDetails, isLoading } = this.props;

    return (
      <Post
        post={postDetails}
        isLoading={isLoading}
        isOpen={isOpen}
        onCancel={this.handleCancel}
        onSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    const {
      post: {
        accounts,
        title,
        rubricColor,
        isEmpty,
      },
      time,
      className,
    } = this.props;

    const classes = classNames(
      'calendar-card',
      className,
      { 'calendar-card_empty': isEmpty },
    );

    return (
      <>
        <div onClick={this.handleDisplayPost} className={classes}>
          <div className="calendar-card__oval" style={{ backgroundColor: rubricColor }} />
          <div className="calendar-card__header">
            <h3 className="calendar-card__title">{title}</h3>
          </div>
          <div className="calendar-card__body">
            <div className="calendar-card__time">{getTime(time)}</div>
            <ul className="calendar-card__accounts">
              {this.renderAccount(accounts)}
            </ul>
          </div>
        </div>
        {this.renderPost()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  postDetails: state.postDetails.items,
  isLoading: state.postDetails.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: () => dispatch(fetchPost()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CalendarCard);
