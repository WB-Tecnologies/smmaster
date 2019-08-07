import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';
import { formatDate } from '@helpers/formatDate';
import { openPost, closePost } from '@actions/displayPostActions';

import CalendarView from '@components/calendar-view/CalendarView';
import ListView from '@components/list-view/ListView';
import Header from '@components/header/Header';
import TabBar from '@components/tab-bar/TabBar';
import TabBarItem from '@components/tab-bar/TabBarItem';
import Button from '@components/button/Button';
import Calendar from '@components/calendar/Calendar';
import Post from '@/components/post/Post';

import { calendarUtils } from './calendarUtils';

import './content-plan.sass';

class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object),
    date: PropTypes.objectOf(PropTypes.string).isRequired,
    isOpenPost: PropTypes.bool.isRequired,
    closePost: PropTypes.func.isRequired,
    openPost: PropTypes.func.isRequired,
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

  handleClosePost = () => {
    const { closePost } = this.props;

    closePost();
  }

  handleOpenPost = () => {
    const { openPost } = this.props;

    openPost('newPostWithNoId');
  }

  getContentHeader = () => (
    <div>
      <Calendar
        getFormatedDate={formatDate}
        format="long-month"
        showMonthYearPicker
        resetAllDatesOfCurrMonth={this.resetAllDatesOfCurrMonth}
      />
      <Button isOutline type="button" className="content-plan__today-btn" onClick={this.handleTodayBtn}>
        Сегодня
      </Button>
    </div>
  );

  handleTodayBtn = () => {
    this.child.scrollToToday();
  };

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

  renderPost = () => {
    const { isOpenPost } = this.props;

    return (
      <Post
        isOpen={isOpenPost}
        onCancel={this.handleClosePost}
      />
    );
  }

  render() {
    const { posts, date } = this.props;
    const { allDatesOfCurrMonth, allActualDatesOfCurrMonth } = this.state;
    const postsByDay = this.getPostsByDayInCalendar(allDatesOfCurrMonth, posts);
    const postsByActualDay = this.getPostsByDayInCalendar(allActualDatesOfCurrMonth, posts);

    return (
      <>
        <Header title="Контент-план" onClick={this.handleOpenPost} />
        <div className="content-plan">
          <TabBar additionalTabBarElem={this.getContentHeader()}>
            <TabBarItem name="calendar" label="calendar" icon="icon-calendar">
              <CalendarView
                onRef={ref => (this.child = ref)}
                postsByDay={postsByDay}
                currentMonth={date}
                getPrevDates={this.getPrevDates}
                getNextDates={this.getNextDates}
                resetAllDatesOfCurrMonth={this.resetAllDatesOfCurrMonth}
              />
            </TabBarItem>
            <TabBarItem name="list" label="list" icon="icon-list">
              <ListView
                onRef={ref => (this.child = ref)}
                postsByDay={postsByActualDay}
                currentMonth={date}
                getNextDates={this.getNextDatesForListView}
              />
            </TabBarItem>
          </TabBar>
        </div>
        {this.renderPost()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  date: state.currentDate.date,
  isOpenPost: state.displayPost.isOpen,
});

const mapDispatchToProps = {
  fetchPosts,
  openPost,
  closePost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentPlanContainer);
