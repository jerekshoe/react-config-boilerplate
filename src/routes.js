// Libary imports
import React from 'react';
import { Route } from 'react-router';

// User imports
import App from './containers/App';

export default (store) => (
  <Route path="/" component={App} store={store} />
);
