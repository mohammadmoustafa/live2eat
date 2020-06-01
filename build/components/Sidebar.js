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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ROUTES = ['/recipes'];

var Nav = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Nav, _React$Component);

  var _super = _createSuper(Nav);

  function Nav() {
    (0, _classCallCheck2["default"])(this, Nav);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Nav, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("nav", {
        className: "nav-group"
      }, /*#__PURE__*/_react["default"].createElement("h5", {
        className: "nav-group-title"
      }, "Navigation"), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.NavLink, {
        to: "/dashboard",
        className: "nav-group-item"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "icon icon-home"
      }), "Dashboard"), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.NavLink, {
        to: "/recipes",
        className: "nav-group-item",
        id: "nav-recipes"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "icon icon-book-open"
      }), "Recipes"));
    }
  }]);
  return Nav;
}(_react["default"].Component);

exports["default"] = Nav;