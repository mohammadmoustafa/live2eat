import React from 'react';
import {NavLink} from 'react-router-dom';

const ROUTES = {
  recipes: '/recipes',
  dashboard: '/dashboard',
};

/**
 * Navigation Sidebar for app. Persists through all views
 * @type {React.Component}
 */
export default class Nav extends React.Component {
  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <nav className="nav-group">
        <h5 className="nav-group-title">Navigation</h5>
        <NavLink to={ROUTES.dashboard} className="nav-group-item">
          <span className="icon icon-home"></span>
          Dashboard
        </NavLink>
        <NavLink to={ROUTES.recipes} className="nav-group-item" id="nav-recipes">
          <span className="icon icon-book-open"></span>
          Recipes
        </NavLink>
      </nav>
    );
  }
}
