import * as React from 'react';
import { Link } from "react-router-dom";

export class Header extends React.Component<{},{}>{
    render():JSX.Element{
        return <nav className="navbar navbar-default">
          <div className="container-fluid">
              <Link to="app" className="navbar-brand">
                <img src="images/pluralsight-logo.png" />
              </Link>
              <ul className="nav navbar-nav">
                <li><Link to="app">Home</Link></li>
                <li><Link to="authors">Authors</Link></li>
                <li><Link to="about">About</Link></li>
              </ul>
          </div>
          </nav>
    }
}

export default Header;