import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shortid from 'shortid';

import { getTime } from '@/helpers/formatDate';
import { getSocialIcons } from '@/helpers/socialIcons';

import './calendar-card.sass';

const MAX_ACCOUNT_TO_SHOW = 4;

class CalendarCard extends PureComponent {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string,
      title: PropTypes.string.isRequired,
      rubricColor: PropTypes.string,
      isEmpty: PropTypes.bool,
      accounts: PropTypes.arrayOf(PropTypes.object),
    }),
    className: PropTypes.string,
    isOutdated: PropTypes.bool,
    openPost: PropTypes.func,
  };

  static defaultProps = {
    post: {
      rubricColor: '#E3E7EB',
      accounts: [],
    },
    className: '',
    isOutdated: false,
    openPost: () => {},
  };

  constructor(props) {
    super(props);

    this.socialIcons = getSocialIcons({ size: 7 });
  }

  handleDisplayPost = () => {
    const { post: { id }, openPost } = this.props;

    openPost(id);
  }

  renderSocialIcon = socialMedia => {
    if (socialMedia in this.socialIcons) {
      return <span className="calendar-card__account-social-icon">{this.socialIcons[socialMedia]}</span>;
    }
  };

  renderAccount = accounts => {
    const accountsIsLonger = accounts.length > MAX_ACCOUNT_TO_SHOW;
    const moreAccounts = accounts.length - MAX_ACCOUNT_TO_SHOW;
    accounts = accountsIsLonger ? accounts.slice(0, MAX_ACCOUNT_TO_SHOW) : accounts;

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

  render() {
    const {
      post: {
        accounts,
        title,
        rubricColor,
        isEmpty,
        date,
      },
      className,
      isOutdated,
    } = this.props;

    const classes = classNames(
      'calendar-card',
      className,
      { 'calendar-card_empty': isEmpty },
      { 'calendar-card_outdated': isOutdated },
    );

    return (
      <>
        <div onClick={this.handleDisplayPost} className={classes}>
          <div className="calendar-card__oval" style={{ backgroundColor: rubricColor }} />
          <div className="calendar-card__header">
            <h3 className="calendar-card__title">{title}</h3>
          </div>
          <div className="calendar-card__body">
            <div className="calendar-card__time">{getTime(date)}</div>
            <ul className="calendar-card__accounts">
              {this.renderAccount(accounts)}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default CalendarCard;
