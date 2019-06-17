import React from 'react';
import PropTypes from 'prop-types';

const IconError = ({
  style, width, className, viewBox,
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ''}`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.25 7C12.25 9.8995 9.8995 12.25 7 12.25C4.10051 12.25 1.75 9.8995 1.75 7C1.75 4.10051 4.10051 1.75 7 1.75C9.8995 1.75 12.25 4.10051 12.25 7ZM13.75 7C13.75 10.7279 10.7279 13.75 7 13.75C3.27208 13.75 0.25 10.7279 0.25 7C0.25 3.27208 3.27208 0.25 7 0.25C10.7279 0.25 13.75 3.27208 13.75 7ZM7 2.5C7.41421 2.5 7.75 2.83579 7.75 3.25V7.75C7.75 8.16421 7.41421 8.5 7 8.5C6.58579 8.5 6.25 8.16421 6.25 7.75V3.25C6.25 2.83579 6.58579 2.5 7 2.5ZM7 9.25C7.41421 9.25 7.75 9.58579 7.75 10V10.75C7.75 11.1642 7.41421 11.5 7 11.5C6.58579 11.5 6.25 11.1642 6.25 10.75V10C6.25 9.58579 6.58579 9.25 7 9.25Z"
      fill="#EB5757"
    />
  </svg>
);

IconError.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
  className: PropTypes.string,
  viewBox: PropTypes.string,
};

IconError.defaultProps = {
  style: {},
  width: '100%',
  className: '',
  viewBox: '0 0 14 14',
};

export default IconError;
