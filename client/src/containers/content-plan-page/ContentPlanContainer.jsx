import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';

import CalendarView from '@components/calendar-view/CalendarView';

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

  render() {
    const { currentMonth } = this.state;
    const { posts } = this.props;

    return (
      <>
        <div className="container">
          <main className="content-plan">
            <div className="content-plan__container">ContentPlanContainer</div>
          </main>
        </div>
        <CalendarView data={posts} currentMonth={currentMonth} />
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
