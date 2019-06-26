import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import CalendarButton from './CalendarButton';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.sass';

const Calendar = ({
  activeDate, formatDate, onChange, showMonthYearPicker,
}) => (

  <div className="calendar">
    <DatePicker
      customInput={<CalendarButton />}
      dateFormat={formatDate(activeDate)}
      selected={activeDate}
      onChange={onChange}
      name="startDate"
      calendarClassName="calendar__container"
      showMonthYearPicker={showMonthYearPicker}
    />
  </div>
);

Calendar.propTypes = {
  activeDate: PropTypes.objectOf(PropTypes.string).isRequired,
  formatDate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  showMonthYearPicker: PropTypes.bool,
};

Calendar.defaultProps = {
  formatDate: () => {},
  showMonthYearPicker: false,
};

export default Calendar;
