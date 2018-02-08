import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <nav>
     <NavLink
       to="/about"
       activeClassName="selected">
      About</NavLink>
      <NavLink
       to="/about"
       activeClassName="selected">
      About</NavLink>
    </nav>
  )
}

export default Header;