import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './checkbox.sass';

const Checkbox = ({
  onChange, id, children, isChecked, className,
}) => {
  const classes = classNames(
    'checkbox',
    className,
    { checkbox_inactive: !isChecked },
  );

  return (
    <label className={classes} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        className="checkbox__input"
        checked={isChecked}
        onChange={onChange}
      />
      <span className="checkbox__checkmark">
        {children}
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: () => {},
  isChecked: false,
  children: null,
  className: '',
};

export default Checkbox;
