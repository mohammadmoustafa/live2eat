import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { remote } from 'electron';
import ModalForm from '../components/ModalForm';
const isDev = require('electron-is-dev');

window.onload = () => {
  ReactDOM.render(<ModalForm />, document.getElementById('root'));
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
