import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './tooltip.sass';

const Tooltip = ({
  position,
  content,
  title,
  isVisible,
}) => {
  const classes = classNames(
    'tooltip',
    { tooltip_visible: isVisible },
  );

  return (
    <div className={classes} style={position}>
      <h5 className="tooltip__title">{title}</h5>
      {content}
    </div>
  );
};

Tooltip.propTypes = {
  position: PropTypes.objectOf(PropTypes.number).isRequired,
  content: PropTypes.string.isRequired,
  title: PropTypes.string,
  isVisible: PropTypes.bool,
};

Tooltip.defaultProps = {
  title: '',
  isVisible: false,
};

export default Tooltip;
