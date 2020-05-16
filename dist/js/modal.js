"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var React = _interopRequireWildcard(require("react"));

var ReactDOM = _interopRequireWildcard(require("react-dom"));

var _ModalForm = _interopRequireDefault(require("../components/ModalForm"));

var isDev = require('electron-is-dev');

window.onload = function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(_ModalForm["default"], null), document.getElementById('root'));

  if (isDev) {
    var script = document.createElement('script');
    script.src = "http://localhost:35729/livereload.js";
    document.body.appendChild(script);
  }
};