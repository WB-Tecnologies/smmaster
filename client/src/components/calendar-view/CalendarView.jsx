import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { setCurrentDate } from '@actions/currentDateActions';
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

  componentDidMount() {
    const rect = ReactDOM.findDOMNode(this.refs['calendarViewContent']).getBoundingClientRect();
    this.top = rect.top;
    this.bottom = this.top + rect.height;
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
    // const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    // const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    // console.log(firstDay)

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

  getCard = item => (
    <>
      {item.id && <div>card</div>}
    </>
  );

  getPrevMonth = currentMonth => {
    if (currentMonth.getMonth() === 11) {
      return new Date(currentMonth.getFullYear() + 1, 0, 1);
    }

    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
  }

  getNextMonth = currentMonth => {
    if (currentMonth.getMonth() === 11) {
      return new Date(currentMonth.getFullYear() + 1, 0, 1);
    }

    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  }

  getAllCalendarCell = () => {
    return Object.keys(this.refs).filter(key =>
       ('refs' in this.refs[key] && 'cellItem' in this.refs[key].refs)).map( key => {
      let rect = ReactDOM.findDOMNode(this.refs[key].refs['cellItem']).getBoundingClientRect();
      return { date : this.refs[key].props.day, yCoord: rect.top};
    });
  }

  setCurrentDateIfNeedIt = () => {
    const dateWithPosition = this.getAllCalendarCell();
    const { currentMonth, setCurrentDate } = this.props;
    let hashTable = {};
    dateWithPosition.forEach(date => {
      if (this.top <= date.yCoord && this.bottom >= date.yCoord) {
        const key = String(
          new Date(date.date.getFullYear(), date.date.getMonth(), 1).setHours(0, 0, 0, 0),
        );// first day
        if (key in hashTable) {
          hashTable[key] += 1;
        } else {
          hashTable[key] = 0;
        }
      }
    });

    const maxDateValue = Object.keys(hashTable).reduce(
      (a, b) => (hashTable[a] > hashTable[b]) ? a : b);
      const maxDate = new Date(parseInt(maxDateValue, 10),
    );
    // console.log(maxDate);
    // console.log(currentMonth);
    if (maxDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentDate(maxDate);
    }
  }

  handleScrollToTop = () => {
    const { getDataByMonth, currentMonth } = this.props;
    const prevMonth = this.getPrevMonth(currentMonth);

    getDataByMonth(prevMonth);
  }

  handleScrollToBottom = () => {
    const { getDataByMonth, currentMonth } = this.props;
    const nextMonth = this.getNextMonth(currentMonth);

    getDataByMonth(nextMonth);
  }

  handleScroll = ({ target }) => {
    this.setCurrentDateIfNeedIt();
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      this.handleScrollToTop();
    }

    if (target.scrollTop === 0) {
      this.handleScrollToBottom();
    }
  }

  render() {
    const { data, currentMonth } = this.props;
    const allDatesOfCurrMonth = this.getAllDatesOfMonth(currentMonth);
    const postsByDay = this.getPostsByDayInCalendar(allDatesOfCurrMonth, data);
    const splitedDays = splitArray(postsByDay, 7);
    let globalIndex = 0;

    return (
      <div className="calendar-view">

        <div className="calendar-row calendar-view__weekdays">{this.getWeekdays()}</div>

        <div ref="calendarViewContent" className="calendar-view__content" onScroll={this.handleScroll}>
          {splitedDays.map(row => (
            <div className="calendar-row" key={shortid.generate()}>
              {row.map(item => (
                <CalendarCell
                  day={item.date}
                  ref={`cellItem${globalIndex}`}
                  key={shortid.generate()}
                  // eslint-disable-next-line no-plusplus
                  index={globalIndex++}
                >
                  {this.getCard(item)}
                </CalendarCell>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setCurrentDate: date => dispatch(setCurrentDate(date)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CalendarView);
