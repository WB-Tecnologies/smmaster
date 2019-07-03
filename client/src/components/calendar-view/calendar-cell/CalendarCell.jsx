import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getFormatedDateWithoutYear } from '@helpers/formatDate';

import Button from '@components/button/Button';
import AddThemeInput from '@components/add-theme-input/AddThemeInput';

import './calendar-cell.sass';

class CalendarCell extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    day: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isHovering: false,
    isShowAddThemeInput: false,
  }

  isCurrentDate = () => {
    let { day } = this.props;
    day = day.setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return day === today;
  }

  handleMouseLeave = () => {
    this.setState({
      isHovering: false,
    });
  }

  handleMouseEnter = () => {
    this.setState({
      isHovering: true,
    });
  }

  handleMouseMove = () => {
    this.setState({
      isHovering: true,
    });
  }

  getCalendarDay = day => (
    (day.getDate() === 1)
      ? (<div className="calendar-cell__day calendar-cell__day_first-day">{getFormatedDateWithoutYear(day)}</div>)
      : (<div className="calendar-cell__day">{String(day.getDate()).padStart(2, '0')}</div>)
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
    const { isHovering, isShowAddThemeInput } = this.state;
    const isFocused = this.isCurrentDate();
    const classes = classNames(
      'calendar-cell',
      { 'calendar-cell_focus': isFocused },
    );

    return (
      <div
        className={classes}
        ref="cellItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        {this.getCalendarDay(day)}
        <div className="calendar-cell__cards">
          {children}
        </div>
        {(isHovering && !isShowAddThemeInput) && (
          <div className="calendar-cell__btn-container">
            <Button isOutline type="button" className="calendar-cell__btn" onClick={this.handleCellBtn}>
              Добавить тему
            </Button>
          </div>
        )}
        {isShowAddThemeInput && <AddThemeInput className="calendar-cell__input" closeBtnClick={this.handleCloseInputBtn} />}
      </div>
    );
  }
}

export default CalendarCell;
