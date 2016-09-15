// Library imports
import express from 'express';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import { syncHistoryWithStore } from 'react-router-redux';
import ReactDOM from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import path from 'path';
import { Provider } from 'react-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import serialize from 'serialize-javascript';

import getRoutes from '../src/routes';
import rootReducer from '../src/reducers/index';
import Html from '../src/helpers/HTML.js';

function createPage(html, store) {
  return `
    <!doctype html>
    <html>
      <body>
        <div id="app">${html}</div>

        <!-- its a Redux initial data -->
        <script dangerouslySetInnerHTML={{__html: \`window.__data=${serialize(store.getState())};\`}} charSet="UTF-8"/>
      </body>
    </html>
  `
}

const app = express();

app.use('/dist', express.static('dist'));

app.use((req, res) => {

  const memoryHistory = createHistory(req.originalUrl);
  const enhancers = compose(
    applyMiddleware(ReduxPromise)
  );

  const store = createStore(rootReducer, {}, enhancers);
  const history = syncHistoryWithStore(memoryHistory, store);
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.

      const appHTML = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );

      // console.log(renderToString(<Html component={appHTML} store={store} />));

      res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={appHTML} store={store} />));
    } else {
      res.status(404).send('Not found');
    }
  });
});


app.listen(process.env.PORT || 8080);
