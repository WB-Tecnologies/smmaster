/* eslint-disable dot-notation */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-string-refs */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { setCurrentDate } from '@actions/currentDateActions';

import ListCell from './list-cell/ListCell';
import ListCard from './list-card/ListCard';

import './list-view.sass';

const DATE_PER_PAGE = 10;

class ListView extends PureComponent {
  static propTypes = {
    currentMonth: PropTypes.objectOf(PropTypes.string).isRequired,
    postsByDay: PropTypes.arrayOf(PropTypes.object),
    setCurrentDate: PropTypes.func.isRequired,
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
    const { onRef } = this.props;

    onRef(this);
    this.prevComparisonForScroll = performance.now();
    this.top = rect.top;
    this.bottom = rect.bottom;
  }

  componentWillUnmount() {
    const { onRef } = this.props;

    onRef(null);
  }

  scrollToToday = () => {
    this.scrollToMonth(new Date());
  }

  scrollToMonth = month => {
    const content = this.calendarViewContent;
    const totalHeight = this.getCellHeightFromTopToCurrentMonth(month);
    content.scrollTo(0, totalHeight);
  }

  renderCards = (items, date) => (
    items && (
      items.map(post => (
        <ListCard
          post={post}
          time={date}
          key={shortid.generate()}
        />
      ))
    )
  )

  handleScrollToBottom = () => {
    const { getNextDates } = this.props;

    getNextDates(DATE_PER_PAGE);
  }

  handleScroll = ({ target }) => {
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      this.handleScrollToBottom();
    }

    const now = performance.now();

    if (now - this.prevComparisonForScroll < 100) return;

    this.setCurrentDateIfNeedIt();
    this.prevComparisonForScroll = now;
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

    const rowCount = count;
    let resSum = 0;
    for (let i = 0; i < Math.min(allHeights.length, rowCount); ++i) {
      resSum += allHeights[i];
    }
    return resSum;
  }

  getFirstDay = date => (new Date(date.getFullYear(), date.getMonth(), 1));

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
      (hashTable[a] > hashTable[b]) ? a : b));

    const maxDate = new Date(parseInt(maxDateValue, 10));

    if (maxDate.getMonth() !== currentMonth.getMonth()) {
      setCurrentDate(maxDate);
    }
  }

  render() {
    const { postsByDay } = this.props;
    let globalIndex = 0;

    return (
      <div className="list-view">
        <div className="list-view__container" ref={c => { this.calendarViewContent = c; }} onScroll={this.handleScroll}>
          <div className="list-view__content">
            {postsByDay.map(({ date, items }) => (
              <ListCell
                className="list-view__day"
                day={date}
                ref={`cellItem${globalIndex}`}
                key={shortid.generate()}
                index={globalIndex++}
              >
                <div className="list-view__cards" key={shortid.generate()}>
                  {this.renderCards(items, date)}
                </div>
              </ListCell>
            ))}
          </div>
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
)(ListView);
