import express from 'express';
import path from 'path';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';

import createStore from './store';

import { fetchMoviesSearch } from './actions/movies';

import htmlTemplate from './htmlTemplate';

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/*', (req, res) => {
  const context = {};

  const searchString = req.query.s;

  const store = createStore();

  if (searchString) {
    store.dispatch(fetchMoviesSearch(searchString))
      .then(() => {
        const jsx = (
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </Provider>
        );

        const reactDom = renderToString(jsx);
        const reduxState = store.getState();

        res.writeHead( 200, {'Content-Type': 'text/html'});
        res.end(htmlTemplate(reactDom, reduxState));
      })
  } else {
    const jsx = (
      <Provider store={store}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const reactDom = renderToString(jsx);
    const reduxState = store.getState();

    res.writeHead( 200, {'Content-Type': 'text/html'});
    res.end(htmlTemplate(reactDom, reduxState));
  }


});

app.listen(3000);