import React from 'react';
import PropTypes from 'prop-types';

const CalendarCell = ({ children, day }) => (
  <div className="calendar-cell">
    <div className="calendar-cell__day">{day}</div>
    <div className="calendar-cell__cards">
      {children}
    </div>
  </div>
);

CalendarCell.propTypes = {
  children: PropTypes.node,
  day: PropTypes.string.isRequired,
};

CalendarCell.defaultProps = {
  children: null,
};

export default CalendarCell;
