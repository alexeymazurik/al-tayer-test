import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './Navbar';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid">
          <Switch>
            <Route exact={true} path="/" component={() => <Redirect to="search" />}></Route>
            <Route path='/search' component={Search} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;