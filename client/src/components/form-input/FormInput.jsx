import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './form-input.sass';

const FormInput = ({
  field, value, label, className, error, type, onChange,
}) => {
  const classes = classNames('form-input', className, {
    'form-input_error': error,
  });
  return (
    <div className={classes}>
      {label && (
        <label className="form-input__label" htmlFor={field}>
          {label}
        </label>
      )}
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={field}
        required
        className="form-input__input"
      />
      {error && <span className="form-input__help-block">{error}</span>}
    </div>
  );
};

FormInput.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

FormInput.defaultProps = {
  className: '',
  error: '',
  label: '',
  onChange: () => {},
};

export default FormInput;
