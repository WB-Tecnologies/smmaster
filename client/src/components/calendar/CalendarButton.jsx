import React from 'react';
import PropTypes from 'prop-types';

import './calendar-button.sass';

const CalendarButton = ({ onClick, value, calendarClassName }) => (
  <button
    className={`calendar-button ${calendarClassName}`}
    onClick={onClick}
    type="button"
  >
    {value}
  </button>
);

CalendarButton.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  calendarClassName: PropTypes.string,
};

CalendarButton.defaultProps = {
  onClick: () => {},
  value: '',
  calendarClassName: '',
};

export default CalendarButton;
