import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';
import { getFormatedDate } from '@helpers/formatDate';

import CalendarView from '@components/calendar-view/CalendarView';
import ListView from '@components/list-view/ListView';
import Header from '@components/header/Header';
import TabBar from '@components/tab-bar/TabBar';
import TabBarItem from '@components/tab-bar/TabBarItem';
import Button from '@components/button/Button';
import Calendar from '@components/calendar/Calendar';

import { calendarUtils } from './calendarUtils';

import './content-plan.sass';

class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.objectOf),
    date: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    posts: [],
  };

  state = {
    allDatesOfCurrMonth: [],
    allActualDatesOfCurrMonth: [],
  }

  componentDidMount() {
    const { fetchPosts, date } = this.props;

    fetchPosts();
    this.setState({
      allDatesOfCurrMonth: calendarUtils.getAllDatesOfMonth(date),
      allActualDatesOfCurrMonth: calendarUtils.getAllDatesOfMonthStartFromToday(date),
    });
  }

  getContentHeader = () => (
    <div>
      <Calendar
        getFormatedDate={getFormatedDate}
        onChange={this.handleCalendar}
        showMonthYearPicker
        resetAllDatesOfCurrMonth={this.resetAllDatesOfCurrMonth}
      />
      <Button isOutline type="button" className="content-plan__today-btn">
        Сегодня
      </Button>
    </div>
  );

  resetAllDatesOfCurrMonth = date => {
    this.setState({ allDatesOfCurrMonth: calendarUtils.getAllDatesOfMonth(date) });
  }

  getPrevDates = (count, callback) => {
    const { allDatesOfCurrMonth } = this.state;

    for (let i = 0; i < count; ++i) {
      const firstDay = new Date(allDatesOfCurrMonth[0]);
      if (!firstDay) return;
      allDatesOfCurrMonth.unshift(calendarUtils.getPrevDay(firstDay));
    }
    this.setState({ allDatesOfCurrMonth: [...allDatesOfCurrMonth] }, callback);
  }

  getNextDates = count => {
    const { allDatesOfCurrMonth } = this.state;

    for (let i = 0; i < count; ++i) {
      const lastDay = new Date(allDatesOfCurrMonth[allDatesOfCurrMonth.length - 1]);
      if (!lastDay) return;
      allDatesOfCurrMonth.push(calendarUtils.getNextDay(lastDay));
    }

    this.setState({ allDatesOfCurrMonth: [...allDatesOfCurrMonth] });
  }

  getNextDatesForListView = count => {
    const { allActualDatesOfCurrMonth } = this.state;

    for (let i = 0; i < count; ++i) {
      const lastDay = new Date(allActualDatesOfCurrMonth[allActualDatesOfCurrMonth.length - 1]);
      if (!lastDay) return;
      allActualDatesOfCurrMonth.push(calendarUtils.getNextDay(lastDay));
    }

    this.setState({ allActualDatesOfCurrMonth: [...allActualDatesOfCurrMonth] });
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

  render() {
    const { posts, date } = this.props;
    const { allDatesOfCurrMonth, allActualDatesOfCurrMonth } = this.state;
    const postsByDay = this.getPostsByDayInCalendar(allDatesOfCurrMonth, posts);
    const postsByActualDay = this.getPostsByDayInCalendar(allActualDatesOfCurrMonth, posts);

    return (
      <>
        <Header title="Контент-план" />
        <div className="content-plan">
          <TabBar additionalTabBarElem={this.getContentHeader()}>
            <TabBarItem name="calendar" label="calendar" icon="icon-calendar">
              <CalendarView
                postsByDay={postsByDay}
                currentMonth={date}
                getPrevDates={this.getPrevDates}
                getNextDates={this.getNextDates}
              />
            </TabBarItem>
            <TabBarItem name="list" label="list" icon="icon-list">
              <ListView
                postsByDay={postsByActualDay}
                currentMonth={date}
                getNextDates={this.getNextDatesForListView}
              />
            </TabBarItem>
          </TabBar>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  date: state.currentDate.date,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentPlanContainer);
