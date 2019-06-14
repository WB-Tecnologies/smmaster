import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import ContentPlanContainer from '@containers/content-plan-page/ContentPlanContainer';
import LoginContainer from '@containers/login-page/LoginContainer';
import App from './App';
import store from './store';

render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={ContentPlanContainer} />
          <Route path="/login" component={LoginContainer} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
