import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getFormatedDateWithoutYear } from '@helpers/formatDate';

import Button from '@components/button/Button';

import './calendar-cell.sass';

class CalendarCell extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    setSelectedId: PropTypes.func.isRequired,
    selectedCellId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    day: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isHovering: false,
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

  handleClick = () => {
    const { setSelectedId, id } = this.props;

    setSelectedId(id);
  }

  getCalendarDay = day => (
    (day.getDate() === 1)
      ? (<div className="calendar-cell__day calendar-cell__day_first-day">{getFormatedDateWithoutYear(day)}</div>)
      : (<div className="calendar-cell__day">{String(day.getDate()).padStart(2, '0')}</div>)
  )

  render() {
    const {
      children, day, selectedCellId, id,
    } = this.props;
    const { isHovering } = this.state;
    const isFocused = selectedCellId === id;
    const classes = classNames(
      'calendar-cell',
      { 'calendar-cell_focus': isFocused },
    );

    return (
      <div
        className={classes}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
      >
        {this.getCalendarDay(day)}
        <div className="calendar-cell__cards">
          {children}
        </div>
        {isHovering && (
          <div className="calendar-cell__btn">
            <Button>
              Добавить тему
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default CalendarCell;
