import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPosts } from '@actions/contentPlanActions';

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@components/button-dropdown/ButtonDropdown';

import userIcon from '@/assets/Account.svg';

import './content-plan.sass';

class ContentPlanContainer extends PureComponent {
  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
  };

  state = {
    dropdownOpen: false,
  };

  componentDidMount() {
    const { fetchPosts } = this.props;

    fetchPosts();
  }

  dropdownToggle = () => {
    const { dropdownOpen } = this.state;

    this.setState({
      dropdownOpen: !dropdownOpen,
    });
  };

  render() {
    const { dropdownOpen } = this.state;

    return (
      <div className="container">
        <main className="content-plan">
          <div className="content-plan__container">ContentPlanContainer</div>
          <ButtonDropdown onClickHandler={this.dropdownToggle}>
            <DropdownToggle>
              <img src={userIcon} alt="user-icon" />
            </DropdownToggle>
            <DropdownMenu isOpen={dropdownOpen}>
              <DropdownItem>Редактировать профиль</DropdownItem>
              <DropdownItem>Выход</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
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
