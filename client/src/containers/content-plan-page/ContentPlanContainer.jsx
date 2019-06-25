import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';

import Header from '@components/header/Header';

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
      <>
        <Header title="Контент-план" />
        <div className="container">
          <main className="content-plan">
            <div>ContentPlanContainer</div>
          </main>

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
