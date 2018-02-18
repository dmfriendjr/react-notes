import React from 'react';
import {NavLink} from 'react-router-dom';
import Login from './Login';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Notes</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active mr-3">
      <NavLink
        to="/"
        activeClassName="selected">
      Home</NavLink>
      </li>
      <li className="nav-item mr-3">
      <NavLink
        to="/note"
        activeClassName="selected">
      My Notes</NavLink> 
      </li>
      <li className="nav-item mr-3">
      <NavLink
        to="/about"
        activeClassName="selected">
      About</NavLink>
      </li>
    </ul>
    <Login />
  </div>
</nav>
  );
};


export default Header;