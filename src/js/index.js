import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {remote} from 'electron';
import App from '../components/app';
const isDev = require('electron-is-dev');


window.onload = () => {
  ReactDOM.render(
      <App />,
      document.getElementById('root'));
  if (isDev) {
    const script = document.createElement('script');
    script.src = 'http://localhost:35729/livereload.js';
    document.body.appendChild(script);
  }

  if (remote.getGlobal('DARK_MODE')) {
    const win = document.getElementsByClassName('window')[0];
    win.classList.add('dark');
  }
};
