import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles';

import createStore  from './store';

import App from './components/App';

// const store = createStore();
//
// render(
//   <Provider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('app')
// );

const store = createStore(window.REDUX_DATA);

hydrate(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
