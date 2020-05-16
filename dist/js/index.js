"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _app = _interopRequireDefault(require("../components/app"));

var isDev = require('electron-is-dev');

var isDark = require('electron').remote.nativeTheme.shouldUseDarkColors;

window.onload = function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(_app["default"], null), document.getElementById('root'));

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