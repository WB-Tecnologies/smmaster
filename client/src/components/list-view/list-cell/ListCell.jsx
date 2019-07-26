/* eslint-disable react/no-string-refs */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from '@helpers/formatDate';

import Button from '@components/button/Button';
import AddThemeInput from '@components/add-theme-input/AddThemeInput';

import './list-cell.sass';

class ListCell extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    day: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isShowAddThemeInput: false,
  }

  isTodayDate = () => {
    let { day } = this.props;
    day = day.setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return day === today;
  }

  getCalendarDay = day => (
    <div className={`list-cell__day ${this.isTodayDate() ? 'list-cell__day_today' : ''}`}>{formatDate({ date: day, format: 'short-date-long-weekday' })}</div>
  )

  handleCellBtn = () => {
    this.setState({
      isShowAddThemeInput: true,
    });
  }

  handleCloseInputBtn = () => {
    this.setState({
      isShowAddThemeInput: false,
    });
  }

  render() {
    const { children, day } = this.props;
    const { isShowAddThemeInput } = this.state;

    return (
      <div className="list-cell" ref="cellItem">
        <div className="list-cell__header">
          {this.getCalendarDay(day)}
          {!isShowAddThemeInput && (
            <div className="list-cell__btn-container">
              <Button isOutline type="button" className="list-cell__btn" onClick={this.handleCellBtn}>
                Добавить тему
              </Button>
            </div>
          )}
          {isShowAddThemeInput && <AddThemeInput className="list-cell__input" closeBtnClick={this.handleCloseInputBtn} date={day} />}
        </div>
        <div className="list-cell__cards">
          {children}
        </div>
      </div>
    );
  }
}

export default ListCell;
