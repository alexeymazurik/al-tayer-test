import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

// FontAwesome initialisation
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGhost } from '@fortawesome/free-solid-svg-icons'

library.add(faGhost);

// Store
import { store } from './store';

// Components
import NavBar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

render(
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <div className="container-fluid">
          <Route exact={true} path="/" component={() => <Redirect to="search" />}></Route>
          <Route path='/search' component={Home} />
          <Route path='/about' component={About} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
