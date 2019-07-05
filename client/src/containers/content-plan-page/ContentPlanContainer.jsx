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
import ModalWindow from '@components/modal-window/ModalWindow';

import ilustration from '!svg-url-loader?noquotes!../../../src/assets/ilustration.svg';// eslint-disable-line import/no-webpack-loader-syntax

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
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

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
        <ModalWindow
          title="Начало работы"
          isOpen={isOpen}
          onCancel={this.handleCancel}
          label="Ок"
          image={ilustration}
        >
          Наши специалисты занимаются планировкой вашего контент-плана.
          Это займет некоторое время и как только он будет готов, на почту придет уведомление.
          Если не хотите ждать, вы можете начать самостоятельно наполять контент-план.
        </ModalWindow>
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
