import React, { Component, PropTypes } from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  render() {
    const { assets, component, store } = this.props;
    const content = component ? renderToString(component) : '';

    return (
      <html lang="en-us">
        <head>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
        </head>
        <body>
          <div id="main" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }} charSet="UTF-8" />
          <script src={assets.javascript.main} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};
