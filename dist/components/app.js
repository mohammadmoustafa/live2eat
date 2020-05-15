"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _Sidebar = _interopRequireDefault(require("./Sidebar"));

var _RecipesView = _interopRequireDefault(require("./RecipesView"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

require('module-alias/register');

var _require = require('electron'),
    remote = _require.remote;

var isDark = remote.nativeTheme.shouldUseDarkColors;

var logger = require('electron-timber');

var App = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(App, _React$Component);

  var _super = _createSuper(App);

  function App() {
    (0, _classCallCheck2["default"])(this, App);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(App, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.HashRouter, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane-sm sidebar"
      }, /*#__PURE__*/_react["default"].createElement(_Sidebar["default"], null)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane"
      }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/recipes"
      }, /*#__PURE__*/_react["default"].createElement(_RecipesView["default"], null)), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
        path: "/dashboard"
      }, /*#__PURE__*/_react["default"].createElement("header", {
        className: "body"
      }, /*#__PURE__*/_react["default"].createElement("h1", {
        className: "body"
      }, "Live To Eat"), /*#__PURE__*/_react["default"].createElement("h2", {
        className: "body"
      }, "System is using ", isDark ? 'dark' : 'light', " mode"))), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Redirect, {
        to: "/dashboard"
      })))));
    }
  }]);
  return App;
}(_react["default"].Component);

exports["default"] = App;