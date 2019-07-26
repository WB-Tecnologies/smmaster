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
    format: PropTypes.string,
  };

  static defaultProps = {
    getFormatedDate: () => {},
    setCurrentDate: () => {},
    resetAllDatesOfCurrMonth: () => {},
    showMonthYearPicker: false,
    date: {},
    format: '',
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
      format,
    } = this.props;

    return (
      <div className="calendar">
        <DatePicker
          customInput={<CalendarButton />}
          dateFormat={getFormatedDate({ date, format })}
          locale={ru}
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
