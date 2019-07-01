import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import CalendarButton from './CalendarButton';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.sass';

class Calendar extends PureComponent {
  state = {
    date: new Date(),
  }

  handleChange = date => {
    const { onChange } = this.props;

    this.setState({ date });
    onChange(date);
  }

  render() {
    const { getFormatedDate, showMonthYearPicker } = this.props;
    const { date } = this.state;

    return (
      <div className="calendar">
        <DatePicker
          customInput={<CalendarButton />}
          dateFormat={getFormatedDate(date)}
          selected={date}
          onChange={this.handleChange}
          name="startDate"
          calendarClassName="calendar__container"
          showMonthYearPicker={showMonthYearPicker}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  getFormatedDate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  showMonthYearPicker: PropTypes.bool,
};

Calendar.defaultProps = {
  getFormatedDate: () => {},
  showMonthYearPicker: false,
};

export default Calendar;
