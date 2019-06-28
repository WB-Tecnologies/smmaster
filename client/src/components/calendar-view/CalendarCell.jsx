import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CalendarCell extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    setSelectedId: PropTypes.func.isRequired,
    selectedCellId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  handleClick = () => {
    const { setSelectedId, id } = this.props;

    setSelectedId(id);
  }

  render() {
    const {
      children, day, selectedCellId, id,
    } = this.props;
    const isFocused = selectedCellId === id;
    const classes = classNames(
      'calendar-cell',
      { 'calendar-cell_focus': isFocused },
    );

    return (
      <div className={classes} onClick={this.handleClick}>
        <div className="calendar-cell__day">{day}</div>
        <div className="calendar-cell__cards">
          {children}
        </div>
      </div>
    );
  }
}

export default CalendarCell;
