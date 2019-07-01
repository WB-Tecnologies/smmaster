import React, { PureComponent } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { splitArray } from '@helpers/utils';

import CalendarCell from './calendar-cell/CalendarCell';

import './calendar-view.sass';

const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

class CalendarView extends PureComponent {
  static propTypes = {
    currentMonth: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    data: [],
  };

  state = {
    selectedCellId: '',
  }

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

  getPostsByDayInCalendar = (dateArray, posts) => {
    if (posts.length === 0) return dateArray;
    let postIdx = 0;
    const result = dateArray.map(date => ({ date: new Date(date) }));
    let dateIdx = 0;

    while (postIdx < posts.length && dateIdx < dateArray.length) {
      let postDate = new Date(posts[postIdx].date);
      postDate = postDate.setHours(0, 0, 0, 0);
      let curDate = new Date(dateArray[dateIdx]);
      curDate = curDate.setHours(0, 0, 0, 0);
      if (postDate === curDate) {
        result[dateIdx] = { ...posts[postIdx], date: new Date(posts[postIdx].date) };
        dateIdx += 1;
        postIdx += 1;
      } else if (postDate > curDate) {
        result[dateIdx] = { date: new Date(curDate) };
        dateIdx += 1;
      } else {
        postIdx += 1;
      }
    }
    return result;
  };

  setSelectedId = id => {
    this.setState({ selectedCellId: id });
  }

  getCard = item => (
    <>
      {item.id && <div>card</div>}
    </>
  );

  render() {
    const { data, currentMonth } = this.props;
    const { selectedCellId } = this.state;
    const allDatesOfMonth = this.getAllDatesOfMonth(currentMonth);
    const postsByDay = this.getPostsByDayInCalendar(allDatesOfMonth, data);
    const splitedDays = splitArray(postsByDay, 7);
    let globalIndex = 0;

    return (
      <div className="calendar-view">
        {this.getWeekdays()}
        {splitedDays.map(row => (
          <div className="calendar-row" key={shortid.generate()}>
            {row.map(item => (
              <CalendarCell
                day={item.date}
                key={shortid.generate()}
                // eslint-disable-next-line no-plusplus
                id={`cell-${globalIndex++}`}
                selectedCellId={selectedCellId}
                setSelectedId={this.setSelectedId}
              >
                {this.getCard(item)}
              </CalendarCell>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default CalendarView;
