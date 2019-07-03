import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';
import { getFormatedDate } from '@helpers/formatDate';

import Calendar from '@components/calendar/Calendar';
import Header from '@components/header/Header';
import TabBar from '@components/tab-bar/TabBar';
import TabBarItem from '@components/tab-bar/TabBarItem';
import Button from '@components/button/Button';
import Modal from '@components/modal/Modal';

import './content-plan.sass';

class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  };

  state = {
    isOpen: true,
  }

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

  handleCancel = () => {
    console.log('Cancel function!');
    this.setState({ isOpen: false });
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <>
        <Header title="Контент-план" />
        <div className="content-plan">
          <div className="container">
            <TabBar additionalTabBarElem={this.getContentHeader()}>
              <TabBarItem name="calendar" label="calendar" icon="icon-calendar">
                tab 1
              </TabBarItem>
              <TabBarItem name="list" label="list" icon="icon-list">
                tab 2
              </TabBarItem>
            </TabBar>
          </div>
        </div>
        <Modal
          title="Test Dialog window"
          isOpen={this.state.isOpen}
          onCancel={this.handleCancel}
        >
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a</p>
        </Modal>
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
