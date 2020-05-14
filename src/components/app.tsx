require('module-alias/register');
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
const { remote } = require('electron');
const isDark = remote.nativeTheme.shouldUseDarkColors;


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="pane-sm sidebar">
          <Sidebar />
        </div>
        <div className="pane">
          <Switch>
            <Route path="/recipes">
              <header className="body">
                <h1 className="body">Recipes</h1>
                <h2 className="body">Hmm...doesn't look like there's anything here.</h2>
              </header>
            </Route>
            <Route>
              <header className="body">
                <h1 className="body">Live To Eat</h1>
                <h2 className="body">System is using {(isDark) ? 'dark' : 'light'} mode</h2>
              </header>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}