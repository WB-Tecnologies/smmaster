import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ListCard from './list-card/ListCard';

class ListView extends PureComponent {
  static propTypes = {
    postsByDay: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    postsByDay: [],
  };

  renderCard = (item, date) => <ListCard post={item} time={date} />

  render() {
    const { postsByDay } = this.props;

    return (
      <div>
        { postsByDay.filter(item => item.items).map(item => (item.items.map(
          post => this.renderCard(post, item.date),
        )))}
      </div>
    );
  }
}

export default ListView;
