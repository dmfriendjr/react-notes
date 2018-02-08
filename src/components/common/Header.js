import React from 'react';
import {NavLink} from 'react-router-dom';
import Login from '../login/Login';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink
        to="/"
        activeClassName="selected">
      Notes</NavLink>
      <NavLink
        to="/note"
        activeClassName="selected">
      New Note</NavLink> 
      <NavLink
        to="/about"
        activeClassName="selected">
      About</NavLink>
      <Login />
    </nav>
  );
};

export default Header;