import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { remote, ipcRenderer } from 'electron';
import RECIPE_SCHEMA from '../assets/recipeSchema.json';
import App from '../components/app';
import { DBContext } from './db-context';
const isDev = require('electron-is-dev');
const leveldown = require('leveldown');


window.onload = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'));
  if (isDev) {
    var script = document.createElement('script');
    script.src = "http://localhost:35729/livereload.js";
    document.body.appendChild(script);
  }

  if (remote.getGlobal('DARK_MODE')) {
    var win = document.getElementsByClassName('window')[0];
    win.classList.add('dark');
  }
};