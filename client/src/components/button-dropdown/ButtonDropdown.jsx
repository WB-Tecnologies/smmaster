import React from 'react';
import PropTypes from 'prop-types';

import './button-dropdown.sass';

const ButtonDropdown = ({ children, onClickHandler }) => React.Children.map(children, child => (
  React.cloneElement(child, {
    onClickHandler,
  })
));

const DropdownToggle = ({ children, onClickHandler }) => (
  <button className="dropdown-toggle" onClick={onClickHandler} type="button">
    {children}
  </button>
);

DropdownToggle.propTypes = {
  children: PropTypes.node,
  onClickHandler: PropTypes.func,
};

DropdownToggle.defaultProps = {
  children: null,
  onClickHandler: () => {},
};

const DropdownMenu = ({ children, isOpen }) => isOpen && <div className="dropdown-menu">{children}</div>;

const DropdownItem = ({ children }) => (
  <button className="dropdown-item" type="button">
    {children}
  </button>
);

DropdownItem.propTypes = {
  children: PropTypes.node,
};

DropdownItem.defaultProps = {
  children: null,
};

export {
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
};
