import React from 'react';
import PropTypes from 'prop-types';

import './button-dropdown.sass';

const ButtonDropdown = ({ children, toggle }) => React.Children.map(children, child => (
  React.cloneElement(child, {
    toggle,
  })
));

const DropdownToggle = ({ children, toggle }) => (
  <button className="dropdown-toggle" onClick={toggle} type="button">
    {children}
  </button>
);

DropdownToggle.propTypes = {
  children: PropTypes.node,
  toggle: PropTypes.func,
};

DropdownToggle.defaultProps = {
  children: null,
  toggle: () => {},
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
