import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';

import TabBar from '@components/tab-bar/TabBar';
import TabBarItem from '@components/tab-bar/TabBarItem';

import './content-plan.sass';

class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  render() {
    return (
      <div className="container">
        <main className="content-plan">
          <div className="content-plan__container">
            <p>ContentPlanContainer</p>
            <TabBar>
              <TabBarItem name="calendar" label="calendar" icon="icon-calendar">
                tab 1
              </TabBarItem>
              <TabBarItem name="list" label="list" icon="icon-list">
                tab 2
              </TabBarItem>
            </TabBar>
          </div>
        </main>
      </div>
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
