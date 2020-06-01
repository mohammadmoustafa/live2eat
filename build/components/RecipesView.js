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

var _require = require('electron'),
    remote = _require.remote;

var url = require('url');

var Dialogs = require('dialogs');

var dialogs = Dialogs();
var firstLoad = false;

var RecipesView = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(RecipesView, _React$Component);

  var _super = _createSuper(RecipesView);

  function RecipesView(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, RecipesView);
    _this = _super.call(this, props);
    _this.state = {
      recipes: [],
      display: [],
      query: ''
    };
    _this.store = new _pouchdbBrowser["default"]('recipes');
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2["default"])(_this));
    _this.showModal = _this.showModal.bind((0, _assertThisInitialized2["default"])(_this));
    _this.loadRecipes = _this.loadRecipes.bind((0, _assertThisInitialized2["default"])(_this));
    _this["delete"] = _this["delete"].bind((0, _assertThisInitialized2["default"])(_this));
    _this.search = _this.search.bind((0, _assertThisInitialized2["default"])(_this));
    _this.edit = _this.edit.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(RecipesView, [{
    key: "loadRecipes",
    value: function loadRecipes() {
      var _this2 = this;

      this.store.allDocs({
        include_docs: true,
        attachments: true,
        binary: true
      }).then(function (docs) {
        _this2.setState({
          recipes: docs.rows,
          display: docs.rows
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

      _electron.ipcRenderer.on('db-refresh', function () {
        _this3.loadRecipes();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      firstLoad = false;
    }
  }, {
    key: "search",
    value: function search(query) {
      this.setState({
        query: query,
        display: this.state.recipes.filter(function (row) {
          return row.doc.title.toLowerCase().includes(query.toLowerCase());
        })
      });
    }
  }, {
    key: "edit",
    value: function edit(doc) {
      this.showModal(doc);
    }
  }, {
    key: "showModal",
    value: function showModal(arg) {
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
        if (arg) win.webContents.send('recipe-edit', arg);
      });
    }
  }, {
    key: "delete",
    value: function _delete(id, rev) {
      var _this4 = this;

      dialogs.confirm("Are you sure you want to delete this recipe?", function (res) {
        if (res) _this4.store.remove(id, rev).then(_this4.loadRecipes)["catch"](console.log);
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(doc) {
      this.props.history.push({
        pathname: "/view_recipe/".concat(doc._id)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

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
          onClick: function onClick() {
            return _this5.showModal();
          }
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
        var formattedRecipes = this.state.display.map(function (row, i) {
          return /*#__PURE__*/_react["default"].createElement("li", {
            className: "list-group-item",
            key: row.doc._id,
            onDoubleClick: function onDoubleClick() {
              return _this5.handleClick(row.doc);
            }
          }, /*#__PURE__*/_react["default"].createElement("img", {
            className: "img-rounded media-object thumb pull-right",
            src: URL.createObjectURL(row.doc._attachments.img.data),
            width: "192",
            height: "128"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "media-body"
          }, /*#__PURE__*/_react["default"].createElement("h3", null, row.doc.title), /*#__PURE__*/_react["default"].createElement("h5", null, "Prep Time: ", row.doc.prepTime.label), /*#__PURE__*/_react["default"].createElement("h5", null, "Cook Time: ", row.doc.cookTime.label)), /*#__PURE__*/_react["default"].createElement("x-contextmenu", null, /*#__PURE__*/_react["default"].createElement("x-menu", null, /*#__PURE__*/_react["default"].createElement("x-menuitem", {
            onClick: function onClick() {
              return _this5.handleClick(row.doc);
            }
          }, /*#__PURE__*/_react["default"].createElement("x-icon", {
            name: "visibility"
          }), /*#__PURE__*/_react["default"].createElement("x-label", null, "View")), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
            onClick: function onClick() {
              return _this5.edit(row.doc);
            }
          }, /*#__PURE__*/_react["default"].createElement("x-icon", {
            name: "create"
          }), /*#__PURE__*/_react["default"].createElement("x-label", null, "Edit")), /*#__PURE__*/_react["default"].createElement("hr", null), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
            onClick: function onClick() {
              return _this5["delete"](row.doc._id, row.doc._rev);
            }
          }, /*#__PURE__*/_react["default"].createElement("x-icon", {
            name: "delete"
          }), /*#__PURE__*/_react["default"].createElement("x-label", null, "Delete '", row.doc.title, "'")))));
        });
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("ul", {
          className: "list-group",
          id: "recipes-group"
        }, /*#__PURE__*/_react["default"].createElement("li", {
          className: "list-group-header"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("input", {
          className: "form-control",
          type: "text",
          placeholder: "Search for a recipe",
          onChange: function onChange(e) {
            return _this5.search(e.target.value);
          }
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
          onClick: function onClick() {
            return _this5.showModal();
          }
        }, "Add new recipe")), /*#__PURE__*/_react["default"].createElement("x-menuitem", {
          disabled: true
        }, /*#__PURE__*/_react["default"].createElement("x-label", null, "Import from URL")))))), formattedRecipes, /*#__PURE__*/_react["default"].createElement("li", {
          className: "list-group-item",
          style: {
            fontWeight: 200,
            opacity: 0.7,
            textAlign: 'center'
          }
        }, "End of recipes.")));
      }
    }
  }]);
  return RecipesView;
}(_react["default"].Component);

RecipesView.contextType = _dbContext.DBContext;
var _default = RecipesView;
exports["default"] = _default;