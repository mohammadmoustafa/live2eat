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

var _dbContext = require("../js/db-context");

var _electron = require("electron");

var _pouchdbBrowser = _interopRequireDefault(require("pouchdb-browser"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var logger = require('electron-timber');

var _require = require('electron'),
    remote = _require.remote;

var url = require('url');

var firstLoad = false;

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
    _this.store = new _pouchdbBrowser["default"]('recipes');
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.showModal = _this.showModal.bind((0, _assertThisInitialized2["default"])(_this));
    _this.loadRecipes = _this.loadRecipes.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(RecipesView, [{
    key: "loadRecipes",
    value: function loadRecipes() {
      var _this2 = this;

      console.log('load recipes running.');
      this.store.allDocs({
        include_docs: true,
        attachments: true,
        binary: true
      }).then(function (docs) {
        console.log(docs.rows);

        _this2.setState({
          recipes: docs.rows
        });
      })["catch"](console.log);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (!firstLoad) {
        firstLoad = false;
        this.loadRecipes();
      }

      _electron.ipcRenderer.on('db-refresh', function (e, arg) {
        console.log('db-refresh');

        _this3.loadRecipes();
      });
    } // componentWillUnmount() {
    //   firstLoad = !firstLoad;
    // }

  }, {
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
        width: top.getBounds().width * 0.75,
        height: top.getBounds().height * 0.9
      });
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
          className: "toolbar-actions"
        }, /*#__PURE__*/_react["default"].createElement("x-button", {
          skin: "flat",
          className: "btn btn-transparent",
          style: {
            marginLeft: '4px',
            paddingTop: '2px',
            "float": 'right'
          }
        }, /*#__PURE__*/_react["default"].createElement("x-label", null, /*#__PURE__*/_react["default"].createElement(_reactIcons.IconContext.Provider, {
          value: {
            className: 'icon-md'
          }
        }, /*#__PURE__*/_react["default"].createElement(_md.MdAdd, null))), /*#__PURE__*/_react["default"].createElement("x-menu", null, /*#__PURE__*/_react["default"].createElement("x-menuitem", null, /*#__PURE__*/_react["default"].createElement("x-label", {
          onClick: this.showModal
        }, "Add new recipe")), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
          disabled: true
        }, /*#__PURE__*/_react["default"].createElement("x-label", null, "Import from URL"))))), /*#__PURE__*/_react["default"].createElement("header", {
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
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          placeholder: "Search for a recipe"
        }), /*#__PURE__*/_react["default"].createElement("x-button", {
          skin: "flat",
          className: "btn btn-transparent pull-right",
          style: {
            marginLeft: '4px',
            paddingTop: '2px',
            "float": 'right'
          }
        }, /*#__PURE__*/_react["default"].createElement("x-label", null, /*#__PURE__*/_react["default"].createElement(_reactIcons.IconContext.Provider, {
          value: {
            className: 'icon-md'
          }
        }, /*#__PURE__*/_react["default"].createElement(_md.MdAdd, null))), /*#__PURE__*/_react["default"].createElement("x-menu", null, /*#__PURE__*/_react["default"].createElement("x-menuitem", null, /*#__PURE__*/_react["default"].createElement("x-label", {
          onClick: this.showModal
        }, "Add new recipe")), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
          disabled: true
        }, /*#__PURE__*/_react["default"].createElement("x-label", null, "Import from URL")))))), this.state.recipes.map(function (row) {
          return /*#__PURE__*/_react["default"].createElement("li", {
            className: "list-group-item",
            key: row.doc._id
          }, /*#__PURE__*/_react["default"].createElement("img", {
            className: "img-rounded media-object thumb pull-right",
            src: URL.createObjectURL(row.doc._attachments.img.data),
            width: "192",
            height: "128"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "media-body"
          }, /*#__PURE__*/_react["default"].createElement("h3", null, row.doc.title)), /*#__PURE__*/_react["default"].createElement("x-contextmenu", null, /*#__PURE__*/_react["default"].createElement("x-menu", null, /*#__PURE__*/_react["default"].createElement("x-menuitem", {
            disabled: true
          }, /*#__PURE__*/_react["default"].createElement("x-icon", {
            name: "visibility"
          }), /*#__PURE__*/_react["default"].createElement("x-label", null, "View")), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
            disabled: true
          }, /*#__PURE__*/_react["default"].createElement("x-icon", {
            name: "create"
          }), /*#__PURE__*/_react["default"].createElement("x-label", null, "Edit")), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
            disabled: true
          }, /*#__PURE__*/_react["default"].createElement("x-icon", {
            name: "delete"
          }), /*#__PURE__*/_react["default"].createElement("x-label", null, "Delete '", row.doc.title, "'")))));
        })));
      }
    }
  }]);
  return RecipesView;
}(_react["default"].Component);

RecipesView.contextType = _dbContext.DBContext;
var _default = RecipesView;
exports["default"] = _default;