import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ListCard from './list-card/ListCard';

class ListView extends PureComponent {
  static propTypes = {
    postsByDay: PropTypes.node,
  };

  static defaultProps = {
    postsByDay: null,
  };

  renderCard = (item, date) => <ListCard post={item} time={date} />

  render() {
    const { postsByDay } = this.props;

    return (
      <div>
        {postsByDay.map(item => (item.items && item.items.map(
          post => this.renderCard(post, item.date),
        )))}
      </div>
    );
  }
}

export default ListView;
