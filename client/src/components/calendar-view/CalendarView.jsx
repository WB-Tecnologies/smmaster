/* eslint-disable dot-notation */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import { setCurrentDate } from '@actions/currentDateActions';
import { splitArray } from '@helpers/utils';
import '@helpers/polifills';

import CalendarCard from './calendar-card/CalendarCard';
import CalendarCell from './calendar-cell/CalendarCell';

import './calendar-view.sass';

const DATE_PER_PAGE = 35;
const DATE_PER_ROW = 7;

class CalendarView extends PureComponent {
  static propTypes = {
    currentMonth: PropTypes.objectOf(PropTypes.string).isRequired,
    postsByDay: PropTypes.arrayOf(PropTypes.object),
    setCurrentDate: PropTypes.func.isRequired,
    getPrevDates: PropTypes.func.isRequired,
    getNextDates: PropTypes.func.isRequired,
    onRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
  };

  static defaultProps = {
    postsByDay: [],
  };

  componentDidMount() {
    const rect = this.calendarViewContent.getBoundingClientRect();
    const { postsByDay, onRef } = this.props;

    onRef(this);
    this.prevComparisonForScroll = performance.now();
    this.top = rect.top;
    this.bottom = rect.bottom;

    if (postsByDay.length === DATE_PER_PAGE) {
      this.addDataToEndOfPage();
      this.addDataToBeignOfPage();
    } else {
      this.scrollToToday();
    }
  }

  componentWillUnmount() {
    const { onRef } = this.props;

    onRef(null);
  }

  scrollToToday = () => {
    this.scrollToMonth(new Date());
  }

  addDataToEndOfPage = () => {
    const { getNextDates } = this.props;

    getNextDates(DATE_PER_PAGE);
  }

  addDataToBeignOfPage = () => {
    const { getPrevDates } = this.props;

    getPrevDates(DATE_PER_PAGE, this.scrollToViewport);
  }

  getWeekdays = () => {
    const weekdays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    return weekdays.map(item => (<div key={shortid.generate()} className="calendar-view__weekday">{item}</div>));
  }

  getFirstDay = date => (new Date(date.getFullYear(), date.getMonth(), 1));

  renderCards = (items, date) => (
    items && (
      items.map(post => {
        const isOutdated = date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

        return (
          <CalendarCard
            post={post}
            time={date}
            isOutdated={isOutdated}
            key={shortid.generate()}
          />
        );
      })
    )
  )

  scrollToViewport = () => {
    const content = this.calendarViewContent;
    const totalHeight = this.getCellTotalHeight();
    content.scrollTo(0, totalHeight);
  }

  scrollToMonth = month => {
    const content = this.calendarViewContent;
    const totalHeight = this.getCellHeightFromTopToCurrentMonth(month);
    content.scrollTo(0, totalHeight);
  }

  getAllCalendarCells = () => {
    const referenceKeys = Object.keys(this.refs);
    const cellItemKeys = referenceKeys.filter(key => (key.startsWith('cellItem')));

    return cellItemKeys.map(key => {
      const cellItemDomNode = ReactDOM.findDOMNode(this.refs[key].refs['cellItem']);
      const yCoord = cellItemDomNode.getBoundingClientRect().top;
      const date = this.refs[key].props.day;
      return { date, yCoord };
    });
  }

  getCellTotalHeight = () => {
    const allHeights = Object.keys(this).filter(key => (key.startsWith('row'))).map(key => {
      const rect = this[key].getBoundingClientRect();
      return rect.height;
    });

    const rowCount = DATE_PER_PAGE / DATE_PER_ROW;
    let resSum = 0;
    for (let i = 0; i < Math.min(allHeights.length, rowCount); ++i) {
      resSum += allHeights[i];
    }
    return resSum;
  }

  getCellHeightFromTopToCurrentMonth = currentMonth => {
    const { postsByDay } = this.props;

    let count = 0;
    while (postsByDay[count].date.getMonth() !== currentMonth.getMonth()
    || postsByDay[count].date.getFullYear() !== currentMonth.getFullYear()) {
      ++count;
    }
    const allHeights = Object.keys(this).filter(key => (key.startsWith('row'))).map(key => {
      const rect = this[key].getBoundingClientRect();
      return rect.height;
    });

    const rowCount = count / DATE_PER_ROW;
    let resSum = 0;
    for (let i = 0; i < Math.min(allHeights.length, rowCount); ++i) {
      resSum += allHeights[i];
    }
    return resSum;
  }

  setCurrentDateIfNeedIt = () => {
    const dateWithPosition = this.getAllCalendarCells();
    const { currentMonth, setCurrentDate } = this.props;
    const hashTable = {};
    dateWithPosition.forEach(item => {
      if (this.top <= item.yCoord && this.bottom >= item.yCoord) {
        const key = String(this.getFirstDay(item.date).setHours(0, 0, 0, 0));

        if (key in hashTable) {
          hashTable[key] += 1;
        } else {
          hashTable[key] = 0;
        }
      }
    });

    const maxDateValue = Object.keys(hashTable).reduce((a, b) => (
      (hashTable[a] > hashTable[b]) ? a : b), 0);

    const maxDate = new Date(parseInt(maxDateValue, 10));

    if (maxDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentDate(maxDate);
    }
  }

  handleScrollToTop = () => {
    this.addDataToBeignOfPage();
  }

  handleScrollToBottom = () => {
    this.addDataToEndOfPage();
  }

  handleScroll = ({ target }) => {
    if (!this.calendarViewContent.contains(target)) return;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      this.handleScrollToBottom();
    }

    if (target.scrollTop === 0) {
      this.handleScrollToTop(target.clientHeight);
    }
    const now = performance.now();

    if (now - this.prevComparisonForScroll < 100) return;

    this.setCurrentDateIfNeedIt();
    this.prevComparisonForScroll = now;
  }

  render() {
    const { postsByDay } = this.props;
    const splitedDays = splitArray(postsByDay, 7);
    let globalIndex = 0;

    return (
      <div className="calendar-view">

        <div className="calendar-row calendar-view__weekdays">{this.getWeekdays()}</div>

        <div ref={c => { this.calendarViewContent = c; }} className="calendar-view__content" onScroll={this.handleScroll}>
          {splitedDays.map((row, rowIdx) => (
            <div className="calendar-row" ref={c => { this[`row${rowIdx}`] = c; }} key={shortid.generate()}>
              {row.map(({ date, items }) => (
                <CalendarCell
                  day={date}
                  ref={`cellItem${globalIndex}`}
                  key={shortid.generate()}
                  index={globalIndex++}
                >
                  {this.renderCards(items, date)}
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
