import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './select.sass';

class Select extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClick: PropTypes.func.isRequired,
    dotColor: PropTypes.string,
    headerTitle: PropTypes.string,
  };

  static defaultProps = {
    dotColor: '',
    headerTitle: '',
  };

  state = {
    listVisible: false,
  }

  openList = () => {
    this.setState({ listVisible: true }, () => {
      document.addEventListener('click', this.closeList);
    });
  }

  closeList = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ listVisible: false }, () => {
        document.removeEventListener('click', this.closeList);
      });
    }
  }

  getSelected = list => list.find(option => option.isSelected);

  handleOption = id => {
    const { onClick } = this.props;

    onClick(id);
    this.setState({ listVisible: false });
  }

  renderList = () => {
    const { list } = this.props;

    return list.map(({ id, name, hex }) => (
      <li className="select__list-item" key={id} onClick={() => { this.handleOption(id); }} role="presentation">
        <div className="select__dot" style={{ backgroundColor: hex }} />
        {name}
      </li>
    ));
  }

  renderHeader = () => {
    const { headerTitle, dotColor, list } = this.props;
    const selectedItem = this.getSelected(list) || {};

    return (
      <>
        <div className="select__dot" style={{ backgroundColor: selectedItem.hex || dotColor }} />
        {selectedItem.name || headerTitle}
      </>
    );
  }

  render() {
    const { listVisible } = this.state;

    const classes = classNames(
      'select__header',
      { select__header_active: listVisible },
    );

    return (
      <div className="select" ref={element => { this.dropdownMenu = element; }}>
        <div className={classes} onClick={this.openList}>
          {this.renderHeader()}
        </div>
        {listVisible && (
          <ul className="select__list">
            {this.renderList()}
          </ul>
        )}
      </div>
    );
  }
}

export default Select;
