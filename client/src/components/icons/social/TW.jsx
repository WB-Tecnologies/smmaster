import React from 'react';
import PropTypes from 'prop-types';

const TW = ({
  style, width, className, viewBox,
}) => (
  <svg
    width={width}
    style={style}
    height={width}
    viewBox={viewBox}
    fill="none"
    className={`svg-icon ${className || ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <rect x="0.578857" width="30" height="30" rx="5" fill="#1CB7EB" />
      <path
        d="M25.2985 9.72893C24.5798 10.0484 23.8063 10.2639 22.9947 10.3604C23.8234 9.86427 24.4587 9.07846 24.7584 8.14104C23.9833 8.60102 23.1253 8.93479 22.2113 9.11497C21.4798 8.33551 20.4372 7.84814 19.2835 7.84814C17.0686 7.84814 15.2727 9.644 15.2727 11.8594C15.2727 12.1733 15.308 12.4793 15.3767 12.7734C12.0429 12.6059 9.08701 11.0092 7.10859 8.58236C6.76331 9.1745 6.56567 9.86347 6.56567 10.5993C6.56567 11.9907 7.27369 13.2186 8.35002 13.9378C7.69279 13.9168 7.07407 13.7362 6.53313 13.4357C6.53273 13.4524 6.53273 13.4695 6.53273 13.4865C6.53273 15.4296 7.91544 17.0505 9.75059 17.4196C9.41404 17.5108 9.05963 17.5601 8.69371 17.5601C8.43495 17.5601 8.18373 17.5351 7.93885 17.4878C8.44963 19.0813 9.93077 20.2413 11.6857 20.2735C10.313 21.3494 8.58378 21.9908 6.70418 21.9908C6.38073 21.9908 6.06124 21.9717 5.74731 21.9344C7.52293 23.073 9.63113 23.7366 11.8961 23.7366C19.2744 23.7366 23.3086 17.6248 23.3086 12.3241C23.3086 12.1503 23.305 11.9768 23.2975 11.8046C24.0809 11.2402 24.7612 10.5334 25.2985 9.72893Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="30" height="30" fill="white" transform="translate(0.578857)" />
      </clipPath>
    </defs>
  </svg>
);

TW.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
  className: PropTypes.string,
  viewBox: PropTypes.string,
};

TW.defaultProps = {
  style: {},
  width: '100%',
  className: '',
  viewBox: '0 0 30 30',
};

export default TW;
