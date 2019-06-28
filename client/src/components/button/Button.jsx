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
  isPrimaryIcon,
  isPrimaryLg,
  isPrimaryMd,
  isGhostIcon,
  isGhost,
  isOutline,
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
    { 'btn-primary_icon': isPrimaryIcon },
    { 'btn-primary_disabled': disabledPrimary },
    { 'btn-primary_large': isPrimaryLg },
    { 'btn-primary_medium': isPrimaryMd },
    { 'btn-ghost_icon': isGhostIcon },
    { 'btn-ghost': isGhost },
    { 'btn-outline': isOutline },
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
  isPrimaryIcon: PropTypes.bool,
  isPrimaryLg: PropTypes.bool,
  active: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabledPrimary: PropTypes.bool,
  isPrimaryMd: PropTypes.bool,
  isGhostIcon: PropTypes.bool,
  isGhost: PropTypes.bool,
  isOutline: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  onClick: () => {},
  className: '',
  disabled: false,
  isPrimary: false,
  isPrimaryIcon: false,
  isPrimaryLg: false,
  active: false,
  isLoading: false,
  disabledPrimary: false,
  isPrimaryMd: false,
  isGhostIcon: false,
  isGhost: false,
  isOutline: false,
};

export default Button;
