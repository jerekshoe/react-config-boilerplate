// Libary imports
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// User imports
import routes from './routes';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const initialState = window.__DATA__;
const store = createStoreWithMiddleware(reducers, initialState,
  window.devToolsExtension && window.devToolsExtension()
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes(store)} />
  </Provider>
, document.getElementById('main'));
