import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../components/app';
const isDev = require('electron-is-dev');
const isDark = require('electron').remote.nativeTheme.shouldUseDarkColors;

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  if (isDev) {
    var script = document.createElement('script');
    script.src = "http://localhost:35729/livereload.js";
    document.body.appendChild(script);
  }

  if (isDark) {
    var win = document.getElementsByClassName('window')[0];
    win.classList.add('dark');
  }
};
