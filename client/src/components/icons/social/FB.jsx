import React from 'react';
import PropTypes from 'prop-types';

const FB = ({
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
      <rect x="0.789551" width="30" height="30" rx="5" fill="#3A589B" />
      <path
        d="M20.5851 12.3776H17.551V10.3877C17.551 9.64037 18.0463 9.46615 18.3951 9.46615C18.7432 9.46615 20.5362 9.46615 20.5362 9.46615V6.18082L17.5875 6.16931C14.314 6.16931 13.5691 8.61961 13.5691 10.1877V12.3776H11.676V15.763H13.5691C13.5691 20.1075 13.5691 25.3423 13.5691 25.3423H17.551C17.551 25.3423 17.551 20.0559 17.551 15.763H20.2378L20.5851 12.3776Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="30" height="30" fill="white" transform="translate(0.789551)" />
      </clipPath>
    </defs>
  </svg>
);

FB.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
  className: PropTypes.string,
  viewBox: PropTypes.string,
};

FB.defaultProps = {
  style: {},
  width: '100%',
  className: '',
  viewBox: '0 0 31 30',
};

export default FB;
