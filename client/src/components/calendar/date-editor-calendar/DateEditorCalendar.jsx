import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';

import CalendarButton from '../CalendarButton';

import 'react-datepicker/dist/react-datepicker.css';
import '../calendar.sass';

class DateEditorCalendar extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    getFormatedDate: PropTypes.func,
    date: PropTypes.objectOf(PropTypes.string).isRequired,
    timeFormat: PropTypes.string,
    timeCaption: PropTypes.string,
    showTimeSelect: PropTypes.bool,
    className: PropTypes.string,
    showTimeSelectOnly: PropTypes.bool,
    format: PropTypes.string,
    minDate: PropTypes.objectOf(PropTypes.string),
  };

  static defaultProps = {
    getFormatedDate: () => {},
    timeFormat: '',
    timeCaption: '',
    showTimeSelect: false,
    className: '',
    showTimeSelectOnly: false,
    format: '',
    minDate: {},
  };

  render() {
    const {
      getFormatedDate,
      date,
      showTimeSelect,
      showTimeSelectOnly,
      timeFormat,
      timeCaption,
      className,
      onChange,
      format,
      minDate,
    } = this.props;

    return (
      <div className="calendar">
        <DatePicker
          customInput={<CalendarButton calendarClassName={className} />}
          dateFormat={getFormatedDate({ date, format })}
          locale={ru}
          selected={date}
          onChange={onChange}
          name="postDate"
          calendarClassName="calendar__container"
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={showTimeSelectOnly}
          timeFormat={timeFormat}
          timeCaption={timeCaption}
          minDate={minDate}
        />
      </div>
    );
  }
}

export default DateEditorCalendar;
