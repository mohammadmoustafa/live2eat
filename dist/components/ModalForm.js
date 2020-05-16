"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var React = _interopRequireWildcard(require("react"));

var _electron = require("electron");

var _reactIcons = require("react-icons");

var _md = require("react-icons/md");

var _bs = require("react-icons/bs");

var _io = require("react-icons/io");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var logger = require('electron-timber');

var ModalForm = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ModalForm, _React$Component);

  var _super = _createSuper(ModalForm);

  function ModalForm(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ModalForm);
    _this = _super.call(this, props);
    _this.state = {
      prepTime: [0, 0, ''],
      cookTime: [0, 0, '']
    };
    _this.exit = _this.exit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.parseDuration = _this.parseDuration.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ModalForm, [{
    key: "exit",
    value: function exit() {
      _electron.remote.getCurrentWindow().close();
    }
  }, {
    key: "parseDuration",
    value: function parseDuration(duration) {
      if (duration == null || duration === '') return 0;
      var mrx = new RegExp(/([0-9][0-9]?)[ ]?m/);
      var hrx = new RegExp(/([0-9][0-9]?)[ ]?hr/);
      var hours = 0;
      var mins = 0;
      if (mrx.test(duration)) mins = parseInt(mrx.exec(duration)[1]);
      if (hrx.test(duration)) hours = parseInt(hrx.exec(duration)[1]);
      return [hours, mins, duration];
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "toolbar-actions",
        onClick: this.exit
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-transparent pull-left",
        disabled: true
      }, /*#__PURE__*/React.createElement("h4", {
        className: "modal-title"
      }, "Add a Recipe")), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-transparent pull-right"
      }, /*#__PURE__*/React.createElement(_reactIcons.IconContext.Provider, {
        value: {
          className: 'icon-md'
        }
      }, /*#__PURE__*/React.createElement(_md.MdClear, null)))), /*#__PURE__*/React.createElement("form", {
        className: "padded-horizontally-more"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, "Recipe"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "form-control"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, /*#__PURE__*/React.createElement(_bs.BsCardImage, null)), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "file",
        className: "form-control"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, "Serves"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        className: "form-control",
        min: 1
      })))), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, /*#__PURE__*/React.createElement(_md.MdKitchen, null), " Prep Time"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "1hr 30m",
        className: "form-control",
        min: 1,
        value: this.state.prepTime[-1],
        onChange: function onChange(e) {
          _this2.setState({
            prepTime: _this2.parseDuration(e.target.value)
          });
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, /*#__PURE__*/React.createElement(_io.IoIosFlame, null), " Cook Time"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "25m",
        className: "form-control",
        min: 1,
        value: this.state.cookTime[-1],
        onChange: function onChange(e) {
          _this2.setState({
            cookTime: _this2.parseDuration(e.target.value)
          });
        }
      }))))));
    }
  }]);
  return ModalForm;
}(React.Component);

exports["default"] = ModalForm;