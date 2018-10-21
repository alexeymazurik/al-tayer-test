import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { pathname } = this.props.location;
    let getLinkClassName = (path) => path === pathname ? 'nav-item active' : 'nav-item';

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">Al Tayer Test</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={getLinkClassName('/home')}>
                <Link to="/home" className="nav-link">Home</Link>
              </li>
              <li className={getLinkClassName('/about')}>
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

const NavBarWithRouter = withRouter(NavBar);

export default NavBarWithRouter;