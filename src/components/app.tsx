require('module-alias/register');
import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import RecipesView from './RecipesView';
import Recipe from './Recipe';
const { remote } = require('electron');
const isDark = remote.nativeTheme.shouldUseDarkColors;
const logger = require('electron-timber');

export default class App extends React.Component<any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <HashRouter>
        <div className="pane-sm sidebar">
          <Sidebar />
        </div>
        <div className="pane">
          <Switch>
            <Route path="/recipes" component={RecipesView} />
            <Route path="/view_recipe/:id" component={Recipe} />
            <Route path="/dashboard">
              <header className="body">
                <h1 className="body">Live To Eat</h1>
                <h2 className="body">System is using {(isDark) ? 'dark' : 'light'} mode</h2>
              </header>
            </Route>
            <Route>
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}
