import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './logo.sass';

import logo from '!svg-url-loader?noquotes!../../../src/assets/logo.svg'; // eslint-disable-line import/no-webpack-loader-syntax

const Logo = ({ link, className }) => (
  <Link to={link} className="logo">
    <img
      src={logo}
      alt="smmaster_logo"
      type="image/svg+xml"
      title="SMMaster"
      className={`logo__img ${className}`}
    />
  </Link>
);

Logo.propTypes = {
  link: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};

export default Logo;
