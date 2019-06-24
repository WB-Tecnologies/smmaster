import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';

import Calendar from '@components/calendar/Calendar';

import './content-plan.sass';

const monthsDictionary = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  getFormatedDate = activeDate => {
    const monthIndex = activeDate.getMonth();
    const year = activeDate.getFullYear();

    return `${monthsDictionary[monthIndex]} ${year}`;
  }

  handleCalendar = () => {
    /*
      fetch to get a new date
    */
  }

  render() {
    const activeDate = new Date();

    return (
      <div className="container">
        <main className="content-plan">
          <div className="content-plan__container">
            <p>ContentPlanContainer</p>
            <Calendar
              formatDate={this.getFormatedDate}
              activeDate={activeDate}
              onChange={this.handleCalendar}
              showMonthYearPicker
            />
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
