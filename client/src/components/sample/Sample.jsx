import React from 'react';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

import './sample.sass';

const Sample = ({ content: { name, link } }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="sample">
      <TextTruncate
        line={3}
        truncateText="…"
        text={name}
      />
    </a>
  );
};

Sample.propTypes = {
  content: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

export default Sample;
