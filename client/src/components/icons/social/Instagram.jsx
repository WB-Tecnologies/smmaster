import React from 'react';
import PropTypes from 'prop-types';

const Instagram = ({
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
      <rect x="0.368408" width="30" height="30" rx="5" fill="url(#paint0_linear)" />
      <path
        d="M15.3089 10.377C12.5311 10.377 10.2295 12.6389 10.2295 15.4563C10.2295 18.2738 12.4914 20.5357 15.3089 20.5357C18.1263 20.5357 20.3882 18.2341 20.3882 15.4563C20.3882 12.6785 18.0866 10.377 15.3089 10.377ZM15.3089 18.7103C13.5231 18.7103 12.0549 17.242 12.0549 15.4563C12.0549 13.6706 13.5231 12.2023 15.3089 12.2023C17.0946 12.2023 18.5628 13.6706 18.5628 15.4563C18.5628 17.242 17.0946 18.7103 15.3089 18.7103Z"
        fill="white"
      />
      <path
        d="M20.5866 11.4088C21.2222 11.4088 21.7374 10.8935 21.7374 10.258C21.7374 9.62241 21.2222 9.10718 20.5866 9.10718C19.951 9.10718 19.4358 9.62241 19.4358 10.258C19.4358 10.8935 19.951 11.4088 20.5866 11.4088Z"
        fill="white"
      />
      <path
        d="M23.5628 7.28177C22.531 6.21034 21.0628 5.65479 19.3961 5.65479H11.2215C7.76912 5.65479 5.46753 7.95637 5.46753 11.4088V19.5437C5.46753 21.25 6.02308 22.7183 7.1342 23.7897C8.20562 24.8215 9.6342 25.3373 11.2612 25.3373H19.3564C21.0628 25.3373 22.4913 24.7818 23.5231 23.7897C24.5945 22.758 25.1501 21.2897 25.1501 19.5834V11.4088C25.1501 9.74209 24.5945 8.31352 23.5628 7.28177ZM23.404 19.5834C23.404 20.8135 22.9675 21.8056 22.2532 22.4802C21.539 23.1548 20.5469 23.5119 19.3564 23.5119H11.2612C10.0707 23.5119 9.07864 23.1548 8.36435 22.4802C7.65007 21.7659 7.29293 20.7738 7.29293 19.5437V11.4088C7.29293 10.2183 7.65007 9.22621 8.36435 8.51193C9.03896 7.83732 10.0707 7.48018 11.2612 7.48018H19.4358C20.6263 7.48018 21.6183 7.83732 22.3326 8.55161C23.0072 9.2659 23.404 10.258 23.404 11.4088V19.5834Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="0.368408"
        y1="30"
        x2="30.3684"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F09433" />
        <stop offset="0.0001" stopColor="#EF9134" />
        <stop offset="0.248181" stopColor="#E6683C" />
        <stop offset="0.499609" stopColor="#DC2743" />
        <stop offset="0.748178" stopColor="#CC2366" />
        <stop offset="1" stopColor="#BC1888" />
      </linearGradient>
      <clipPath id="clip0">
        <rect width="30" height="30" fill="white" transform="translate(0.368408)" />
      </clipPath>
    </defs>
  </svg>
);

Instagram.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
  className: PropTypes.string,
  viewBox: PropTypes.string,
};

Instagram.defaultProps = {
  style: {},
  width: '100%',
  className: '',
  viewBox: '0 0 31 30',
};

export default Instagram;
