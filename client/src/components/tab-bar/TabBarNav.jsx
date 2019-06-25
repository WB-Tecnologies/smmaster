import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@components/button/Button';

import './tab-bar-nav.sass';

const TabBarNav = ({
  navLabel, className, onChangeActiveTab, icon,
}) => {
  const classes = classNames('nav-item', className);

  return (
    <Button
      className={classes}
      type="button"
      onClick={() => {
        onChangeActiveTab(navLabel);
      }}
    >
      <span className={`nav-item__icon ${icon} ${className}`} />
    </Button>
  );
};

TabBarNav.propTypes = {
  navLabel: PropTypes.string,
  onChangeActiveTab: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.string,
};

TabBarNav.defaultProps = {
  navLabel: '',
  onChangeActiveTab: () => {},
  className: '',
  icon: '',
};

export default TabBarNav;
