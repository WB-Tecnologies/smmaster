import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';

import { setCurrentDate } from '@/actions/currentDateActions';

import CalendarButton from './CalendarButton';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.sass';

class Calendar extends PureComponent {
  static propTypes = {
    getFormatedDate: PropTypes.func,
    setCurrentDate: PropTypes.func,
    showMonthYearPicker: PropTypes.bool,
    date: PropTypes.objectOf(PropTypes.string),
    resetAllDatesOfCurrMonth: PropTypes.func,
    timeFormat: PropTypes.string,
    timeCaption: PropTypes.string,
    showTimeSelect: PropTypes.bool,
    className: PropTypes.string,
    showTimeSelectOnly: PropTypes.bool,
    timeIntervals: PropTypes.number,
  };

  static defaultProps = {
    getFormatedDate: () => {},
    setCurrentDate: () => {},
    resetAllDatesOfCurrMonth: () => {},
    showMonthYearPicker: false,
    date: {},
    timeFormat: '',
    timeCaption: '',
    showTimeSelect: false,
    className: '',
    showTimeSelectOnly: false,
    timeIntervals: 60,
  };

  handleChange = date => {
    const { setCurrentDate, resetAllDatesOfCurrMonth } = this.props;

    resetAllDatesOfCurrMonth(date);
    setCurrentDate(date);
  }

  render() {
    const {
      getFormatedDate,
      showMonthYearPicker,
      date,
      showTimeSelect,
      showTimeSelectOnly,
      timeIntervals,
      timeFormat,
      timeCaption,
      className,
    } = this.props;

    return (
      <div className="calendar">
        <DatePicker
          customInput={<CalendarButton calendarClassName={className} />}
          dateFormat={getFormatedDate(date)}
          locale={ru}
          selected={date}
          onChange={this.handleChange}
          name="startDate"
          calendarClassName="calendar__container"
          showMonthYearPicker={showMonthYearPicker}
          showTimeSelect={showTimeSelect}
          timeIntervals={timeIntervals}
          showTimeSelectOnly={showTimeSelectOnly}
          timeFormat={timeFormat}
          timeCaption={timeCaption}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.currentDate.date,
});

const mapDispatchToProps = dispatch => ({
  setCurrentDate: date => dispatch(setCurrentDate(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Calendar);
