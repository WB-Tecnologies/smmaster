import React from 'react';
import PropTypes from 'prop-types';

import './calendar-button.sass';

const CalendarButton = ({ onClick, value }) => (
  <button
    className="calendar-button"
    onClick={onClick}
    type="button"
  >
    {value}
  </button>
);

CalendarButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
};

CalendarButton.defaultProps = {
  onClick: () => {},
  value: '',
};

export default CalendarButton;
