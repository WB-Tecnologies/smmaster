import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './button.sass';

const Button = ({
  children,
  onClick,
  className,
  disabled,
  disabledPrimary,
  isLoading,
  isPrimary,
  isPrimaryLg,
  isPrimaryMd,
  isIcon,
  isGhost,
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
    { 'btn-primary_large': isPrimaryLg },
    { 'btn-primary_medium': isPrimaryMd },
    { 'btn-ghost_icon': isIcon },
    { 'btn-ghost': isGhost },
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
  isPrimary: PropTypes.bool,
  isPrimaryLg: PropTypes.bool,
  active: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabledPrimary: PropTypes.bool,
  isPrimaryMd: PropTypes.bool,
  isIcon: PropTypes.bool,
  isGhost: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  className: '',
  disabled: false,
  isPrimary: false,
  isPrimaryLg: false,
  active: false,
  isLoading: false,
  disabledPrimary: false,
  isPrimaryMd: false,
  isIcon: false,
  isGhost: false,
};

export default Button;