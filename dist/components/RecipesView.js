"use strict";

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

var _react = _interopRequireDefault(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _reactIcons = require("react-icons");

var _md = require("react-icons/md");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var logger = require('electron-timber');

var _require = require('electron'),
    remote = _require.remote;

var url = require('url');

var RecipesView = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(RecipesView, _React$Component);

  var _super = _createSuper(RecipesView);

  function RecipesView(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, RecipesView);
    _this = _super.call(this, props);
    _this.state = {
      recipes: []
    };
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.showModal = _this.showModal.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(RecipesView, [{
    key: "showModal",
    value: function showModal() {
      var top = remote.getCurrentWindow();
      var win = new remote.BrowserWindow({
        parent: top,
        modal: true,
        show: false,
        webPreferences: {
          nodeIntegration: true
        },
        width: top.getBounds().width,
        height: top.getBounds().height / 2
      });
      logger.log("Modal navigating to html/modal.html");
      win.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: require('path').join(__dirname, '../html/modal.html')
      }));
      win.once('ready-to-show', function () {
        win.show();
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      logger.log('Add recipe button has been clicked');
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.recipes.length === 0) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: "toolbar-actions",
          onClick: this.showModal
        }, /*#__PURE__*/_react["default"].createElement("button", {
          className: "btn btn-transparent pull-right"
        }, /*#__PURE__*/_react["default"].createElement(_reactIcons.IconContext.Provider, {
          value: {
            className: 'icon-md'
          }
        }, /*#__PURE__*/_react["default"].createElement(_md.MdAdd, null)))), /*#__PURE__*/_react["default"].createElement("header", {
          className: "body"
        }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faReceipt,
          className: "icon-xl",
          style: {
            marginBottom: "15px"
          }
        }), /*#__PURE__*/_react["default"].createElement("h3", {
          className: "body"
        }, "Hmm...doesn't look like there's anything here.")));
      } else {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("ul", {
          className: "list-group"
        }, /*#__PURE__*/_react["default"].createElement("li", {
          className: "list-group-header"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          placeholder: "Search for someone"
        })), /*#__PURE__*/_react["default"].createElement("li", {
          className: "list-group-item"
        }, /*#__PURE__*/_react["default"].createElement("img", {
          className: "img-circle media-object pull-left",
          src: "https://via.placeholder.com/150",
          width: "32",
          height: "32"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "media-body"
        }, /*#__PURE__*/_react["default"].createElement("strong", null, "List item title"), /*#__PURE__*/_react["default"].createElement("p", null, "Lorem ipsum dolor sit amet.")))));
      }
    }
  }]);
  return RecipesView;
}(_react["default"].Component);

exports["default"] = RecipesView;