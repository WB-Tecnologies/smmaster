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
  };

  static defaultProps = {
    postsByDay: [],
  };

  componentDidMount() {
    const rect = this.calendarViewContent.getBoundingClientRect();
    this.prevComparisonForScroll = performance.now();
    this.top = rect.top;
    this.bottom = rect.bottom;
  }

  renderCard = (item, date) => <ListCard post={item} time={date} />

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

  getCellTotalHeight = () => {
    const referenceKeys = Object.keys(this.refs);
    const cellItemKeys = referenceKeys.filter(key => (key.startsWith('cellItem')));

    const allHeights = cellItemKeys.map(key => {
      const rect = this.refs[key].getBoundingClientRect();
      return rect.height;
    });

    let resSum = 0;
    for (let i = 0; i < Math.min(allHeights.length, DATE_PER_PAGE); ++i) {
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
            {postsByDay.map(item => (
              <ListCell
                className="list-view__day"
                day={item.date}
                ref={`cellItem${globalIndex}`}
                key={shortid.generate()}
                index={globalIndex++}
              >
                <div className="list-view__cards" key={shortid.generate()}>
                  {item.items && item.items.map(post => this.renderCard(post, item.date))}
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
