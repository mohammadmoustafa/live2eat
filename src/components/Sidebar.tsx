import React from 'react';
import { NavLink } from 'react-router-dom';

const ROUTES = ['/recipes'];

export default class Nav extends React.Component {

  render() {
    return (
      <nav className="nav-group">
        <h5 className="nav-group-title">Navigation</h5>
        <NavLink to="/dashboard" className="nav-group-item">
          <span className="icon icon-home"></span>
          Dashboard
        </NavLink>
        <NavLink to="/recipes" className="nav-group-item">
          <span className="icon icon-book-open"></span>
          Recipes
        </NavLink>
      </nav>
    );
  }
}