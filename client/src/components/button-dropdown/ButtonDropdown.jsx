import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './button-dropdown.sass';

class ButtonDropdown extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: '',
  };

  state = {
    dropdownOpen: false,
  };

  dropdownToggle = () => {
    const { dropdownOpen } = this.state;

    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  };

  render() {
    const { children, className } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <div className="button-dropdown">
        {
          React.Children.map(children, child => (
            React.cloneElement(child, {
              onClickHandler: this.dropdownToggle,
              isOpen: dropdownOpen,
              className,
            })
          ))
        }
      </div>
    );
  }
}

const DropdownToggle = ({ children, onClickHandler, className }) => (
  <button className={`dropdown-toggle ${className}`} onClick={onClickHandler} type="button">
    {children}
  </button>
);

DropdownToggle.propTypes = {
  children: PropTypes.node,
  onClickHandler: PropTypes.func,
  className: PropTypes.string,
};

DropdownToggle.defaultProps = {
  children: null,
  onClickHandler: () => {},
  className: '',
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
