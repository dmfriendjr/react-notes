import React from 'react';
import {NavLink} from 'react-router-dom';
import Login from '../login/Login';

const Header = (props) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink
        to="/"
        activeClassName="selected">
      Home</NavLink>
      <NavLink
        to="/note"
        activeClassName="selected">
      My Notes</NavLink> 
      <NavLink
        to="/about"
        activeClassName="selected">
      About</NavLink>
      <Login />
    </nav>
  );
};


export default Header;