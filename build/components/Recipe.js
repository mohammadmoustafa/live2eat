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

var _pouchdbBrowser = _interopRequireDefault(require("pouchdb-browser"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Recipe = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(Recipe, _React$Component);

  var _super = _createSuper(Recipe);

  function Recipe(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Recipe);
    _this = _super.call(this, props);
    _this.db = new _pouchdbBrowser["default"]('recipes');
    _this._id = _this.props.match.params.id;
    _this.state = {
      recipe: null
    };
    _this.timeLabel = _this.timeLabel.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Recipe, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.db.get(this._id, {
        attachments: true,
        binary: true
      }).then(function (doc) {
        _this2.setState({
          recipe: doc
        });
      })["catch"](console.log);
    }
  }, {
    key: "timeLabel",
    value: function timeLabel(time) {
      var hrs = time.hours > 0 ? "".concat(time.hours, " hrs") : '';
      var mins = time.mins > 0 ? time.mins > 1 ? "".concat(time.mins, " mins") : "".concat(time.mins, " min") : '';
      return [hrs, mins].join(' ');
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.recipe) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: "hero-image",
          style: {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(".concat(URL.createObjectURL(this.state.recipe._attachments.img.data), ")")
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "hero-text"
        }, /*#__PURE__*/_react["default"].createElement("h1", null, this.state.recipe.title))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "col",
          style: {
            height: '55%'
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "row",
          id: "recipe-meta"
        }, /*#__PURE__*/_react["default"].createElement("span", null, "Prep Time: ", this.timeLabel(this.state.recipe.prepTime)), /*#__PURE__*/_react["default"].createElement("span", null, "Cook Time: ", this.timeLabel(this.state.recipe.cookTime)), /*#__PURE__*/_react["default"].createElement("span", null, "Serves: ", this.state.recipe.serves), /*#__PURE__*/_react["default"].createElement("span", null, "Category: ", this.state.recipe.category)), /*#__PURE__*/_react["default"].createElement("div", {
          className: "row"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "col",
          id: "recipe-ingredients"
        }, /*#__PURE__*/_react["default"].createElement("ul", {
          className: "ul-no-style"
        }, "Ingredients", this.state.recipe.ingredients.map(function (item, i) {
          return /*#__PURE__*/_react["default"].createElement("li", {
            key: i
          }, item.quantity, " ", item.unit, " ", item.label);
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "col",
          id: "recipe-directions",
          style: {
            flexGrow: 2
          }
        }, /*#__PURE__*/_react["default"].createElement("ol", {
          className: "ul-no-style"
        }, "Directions", this.state.recipe.directions.map(function (item, i) {
          return /*#__PURE__*/_react["default"].createElement("li", {
            key: i
          }, item);
        })))), this.state.recipe.notes && /*#__PURE__*/_react["default"].createElement("div", {
          className: "col",
          id: "recipe-notes"
        }, /*#__PURE__*/_react["default"].createElement("h4", null, "Notes"), /*#__PURE__*/_react["default"].createElement(_reactMarkdown["default"], {
          source: this.state.recipe.notes
        }))));
      }

      return /*#__PURE__*/_react["default"].createElement("x-throbber", {
        "class": "center-noflex",
        type: "spin"
      });
    }
  }]);
  return Recipe;
}(_react["default"].Component);

exports["default"] = Recipe;