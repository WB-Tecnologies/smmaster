import React from 'react';
import PropTypes from 'prop-types';

import './checkbox.sass';

const Checkbox = ({
  onChange, id, children, isChecked,
}) => (
  <label className="checkbox" htmlFor={id}>
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

Checkbox.propTypes = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

Checkbox.defaultProps = {
  onChange: () => {},
  isChecked: false,
  children: null,
};

export default Checkbox;
