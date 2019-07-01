import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';
import { getFormatedDate } from '@helpers/formatDate';

import CalendarView from '@components/calendar-view/CalendarView';
import Header from '@components/header/Header';
import TabBar from '@components/tab-bar/TabBar';
import TabBarItem from '@components/tab-bar/TabBarItem';
import Button from '@components/button/Button';
import Calendar from '@components/calendar/Calendar';

import './content-plan.sass';

class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    posts: [],
  };

  state = {
    currentMonth: new Date(),
  };

  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  handleCalendar = () => {
    /*
      post request to get a new posts by date
    */
  }

  getContentHeader = () => (
    <div>
      <Calendar
        getFormatedDate={getFormatedDate}
        onChange={this.handleCalendar}
        showMonthYearPicker
      />
      <Button isOutline type="button" className="content-plan__today-btn">
        Сегодня
      </Button>
    </div>
  );


  render() {
    const { currentMonth } = this.state;
    const { posts } = this.props;

    return (
      <>
        <Header title="Контент-план" />
        <div className="content-plan">
          <TabBar additionalTabBarElem={this.getContentHeader()}>
            <TabBarItem name="calendar" label="calendar" icon="icon-calendar">
              <CalendarView data={posts} currentMonth={currentMonth} />
            </TabBarItem>
            <TabBarItem name="list" label="list" icon="icon-list">
              tab 2
            </TabBarItem>
          </TabBar>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContentPlanContainer);
