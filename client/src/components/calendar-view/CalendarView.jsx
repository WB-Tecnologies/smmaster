import React, { PureComponent } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { listToMatrix } from '@helpers/utils';

import CalendarCell from './CalendarCell';

import './calendar-view.sass';

const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

class CalendarView extends PureComponent {
  static propTypes = {
    currentMonth: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  getWeekdays = () => (
    weekdays.map(item => (<div key={shortid.generate()} className="calendar-view__weekday">{item}</div>))
  )

  getFirstDayForMonth = currentMonth => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);

    while (firstDay.getDay() !== 1) {
      firstDay.setDate(firstDay.getDate() - 1);
    }

    return firstDay;
  }

  getLastDayForMonth = currentMonth => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const lastDay = new Date(year, month + 1, 0);

    while (lastDay.getDay() !== 0) {
      lastDay.setDate(lastDay.getDate() + 1);
    }

    return lastDay;
  }

  getAllDatesOfMonth = currentMonth => {
    const result = [];
    const firstDay = this.getFirstDayForMonth(currentMonth);
    const lastDay = this.getLastDayForMonth(currentMonth);

    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      result.push(new Date(day));
    }

    return result;
  }

  render() {
    const { currentMonth } = this.props;
    const array = this.getAllDatesOfMonth(currentMonth);
    const matrix = listToMatrix(array, 7);

    return (
      <div className="calendar-view">
        {this.getWeekdays()}
        {matrix.map(row => (
          <div className="calendar-row" key={shortid.generate()}>
            {row.map(item => (
              <CalendarCell
                className="calendar-cell"
                day={String(item.getDate()).padStart(2, '0')}
                key={shortid.generate()}
              >
                <div>card-1</div>
                <div>card-2</div>
                <div>card-3</div>
              </CalendarCell>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default CalendarView;
