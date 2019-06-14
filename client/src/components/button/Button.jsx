import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.sass';

const Button = ({
  children,
  onClick,
  className,
  disabled,
  disabledOutline,
  disabledPrimary,
  isOutline,
  isLoading,
  isPrimary,
  isIcon,
  isGhost,
  isLarge,
  isDropdown,
  isMedium,
  active,
  ...attrs
}) => {
  const onClickAction = e => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

  const classes = classNames(
    'btn',
    className,
    { 'btn-primary': isPrimary },
    { 'btn-primary_disabled': disabledPrimary },
    { 'btn-primary_large': isLarge },
    { 'btn-primary_medium': isMedium },
    { active },
  );

  const Tag = attrs.href ? 'a' : 'button';

  return (
    <Tag className={classes} disabled={disabled} onClick={onClickAction} {...attrs}>
      {isLoading ? <span className="btn__spinner" /> : children}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isOutline: PropTypes.bool,
  isPrimary: PropTypes.bool,
  isLarge: PropTypes.bool,
  active: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isIcon: PropTypes.bool,
  isGhost: PropTypes.bool,
  disabledOutline: PropTypes.bool,
  disabledPrimary: PropTypes.bool,
  isMedium: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  className: '',
  disabled: false,
  isOutline: false,
  isPrimary: false,
  isLarge: false,
  active: false,
  isLoading: false,
  isDropdown: false,
  isIcon: false,
  isGhost: false,
  disabledOutline: false,
  disabledPrimary: false,
  isMedium: false,
};

export default Button;
