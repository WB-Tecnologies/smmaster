import React from 'react';
import PropTypes from 'prop-types';

import './styles/main.sass';

const App = ({ children }) => <>{children}</>;

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default App;
