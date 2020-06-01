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

var _flakeIdgen = _interopRequireDefault(require("flake-idgen"));

var _data = _interopRequireDefault(require("../assets/data.json"));

var _pouchdbBrowser = _interopRequireDefault(require("pouchdb-browser"));

var _mousetrap = _interopRequireDefault(require("mousetrap"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var intformat = require('biguint-format');

var generator = new _flakeIdgen["default"]();

var ModalForm = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ModalForm, _React$Component);

  var _super = _createSuper(ModalForm);

  function ModalForm(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ModalForm);
    _this = _super.call(this, props);
    _this.state = {
      _id: intformat(generator.next(), 'hex'),
      _rev: '',
      title: '',
      img: '',
      serves: '',
      prepTime: {
        hours: 0,
        mins: 0,
        label: ''
      },
      cookTime: {
        hours: 0,
        mins: 0,
        label: ''
      },
      directions: [],
      dirTextVal: '',
      ingredients: [],
      ingrTextVal: '',
      category: 'DEFAULT',
      notes: '',
      update: false
    };
    _this.fileRef = React.createRef();
    _this.store = new _pouchdbBrowser["default"]('recipes');
    _this.exit = _this.exit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.submit = _this.submit.bind((0, _assertThisInitialized2["default"])(_this));
    _this.parseDuration = _this.parseDuration.bind((0, _assertThisInitialized2["default"])(_this));
    _this.parseIngredient = _this.parseIngredient.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(ModalForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _mousetrap["default"].bind('esc', this.exit, 'keyup');

      _electron.ipcRenderer.on('recipe-edit', function (e, doc) {
        var newState = {
          _id: doc._id,
          _rev: doc._rev,
          title: doc.title,
          serves: doc.serves,
          prepTime: doc.prepTime,
          cookTime: doc.cookTime,
          directions: doc.directions,
          dirTextVal: doc.directions.join(', '),
          ingredients: doc.ingredients,
          category: doc.category,
          notes: doc.notes,
          update: true,
          ingrTextVal: doc.ingredients.reduce(function (acc, curr) {
            acc.push("".concat(curr.quantity).concat(curr.unit, " ").concat(curr.label));
            return acc;
          }, []).join(', ')
        };

        _this2.store.getAttachment(doc._id, 'img').then(function (res) {
          newState.img = res;

          _this2.setState(newState);
        })["catch"](console.log);
      });
    }
  }, {
    key: "parseDuration",
    value: function parseDuration(duration) {
      var mrx = new RegExp(/([0-9][0-9]?)[ ]?m/);
      var hrx = new RegExp(/([0-9][0-9]?)[ ]?hr/);
      var hours = 0;
      var mins = 0;
      if (mrx.test(duration)) mins = parseInt(mrx.exec(duration)[1]);
      if (hrx.test(duration)) hours = parseInt(hrx.exec(duration)[1]);
      return {
        hours: hours,
        mins: mins,
        label: duration
      };
    }
  }, {
    key: "parseIngredient",
    value: function parseIngredient(ingredients) {
      var result = [];

      var units = _data["default"].units.join('|');

      var irx = new RegExp(['^(\\d{1,4}(\\.\\d)?)[ ]?', "(".concat(units, ")s? "), '(\\b[^\\d\\W]+(\\b[ |\\W][^\\d\\W]+\\b)*\\b)$'].join(''));
      ingredients.split(',').forEach(function (ingredient) {
        var string = ingredient.trim();

        if (irx.test(string)) {
          var exec = irx.exec(string);
          result.push({
            quantity: exec[1],
            unit: exec[3],
            label: exec[4]
          });
        }
      });
      this.setState({
        ingredients: result,
        ingrTextVal: ingredients
      });
    }
  }, {
    key: "exit",
    value: function exit() {
      _electron.remote.getCurrentWindow().close();
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this3 = this;

      var recipe = {
        _id: this.state._id,
        _attachments: {
          'img': {
            data: this.state.img,
            content_type: this.state.img.type
          }
        },
        title: this.state.title,
        serves: parseInt(this.state.serves),
        prepTime: this.state.prepTime,
        cookTime: this.state.cookTime,
        directions: this.state.directions,
        ingredients: this.state.ingredients,
        category: this.state.category,
        notes: this.state.notes
      };

      if (this.state.update) {
        recipe._rev = this.state._rev;
      }

      this.store.put(recipe).then(function () {
        _electron.ipcRenderer.send('db-refresh-request');

        _this3.exit();
      })["catch"](console.log);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "toolbar-actions"
      }, /*#__PURE__*/React.createElement("button", {
        className: "btn btn-transparent pull-left",
        disabled: true
      }, /*#__PURE__*/React.createElement("h4", {
        className: "modal-title"
      }, "Add a Recipe")), /*#__PURE__*/React.createElement("button", {
        className: "btn btn-transparent pull-right",
        onClick: this.exit
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
        className: "form-control",
        value: this.state.title,
        onChange: function onChange(e) {
          _this4.setState({
            title: e.target.value
          });
        }
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
        className: "form-control",
        accept: "image/*",
        ref: this.fileRef,
        onChange: function onChange(e) {
          _this4.setState({
            img: e.target.files[0]
          });
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, "Serves"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        className: "form-control",
        min: 1,
        value: this.state.serves,
        onChange: function onChange(e) {
          return _this4.setState({
            serves: e.target.value
          });
        }
      })))), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, "Prep Time"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "e.g. 1hr 30m",
        className: "form-control",
        min: 1,
        value: this.state.prepTime.label,
        onChange: function onChange(e) {
          _this4.setState({
            prepTime: _this4.parseDuration(e.target.value)
          });
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, "Cook Time"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        placeholder: "e.g. 25m",
        className: "form-control",
        min: 1,
        value: this.state.cookTime.label,
        onChange: function onChange(e) {
          _this4.setState({
            cookTime: _this4.parseDuration(e.target.value)
          });
        }
      })))), /*#__PURE__*/React.createElement("div", {
        className: "row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group form-group"
      }, /*#__PURE__*/React.createElement("div", {
        className: "input-group-prepend"
      }, "Category"), /*#__PURE__*/React.createElement("div", {
        className: "input-group-area"
      }, /*#__PURE__*/React.createElement("select", {
        className: "form-control",
        value: this.state.category,
        onChange: function onChange(e) {
          return _this4.setState({
            category: e.target.value
          });
        }
      }, /*#__PURE__*/React.createElement("option", {
        value: "DEFAULT",
        disabled: true
      }, "Select A Category"), _data["default"].categories.map(function (v, i) {
        return /*#__PURE__*/React.createElement("option", {
          value: v.value,
          key: i
        }, v.label);
      }))))), /*#__PURE__*/React.createElement("div", {
        className: "row text-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Ingredients"), /*#__PURE__*/React.createElement("textarea", {
        className: "form-control",
        value: this.state.ingrTextVal,
        placeholder: "Separate each ingredient with a comma",
        onChange: function onChange(e) {
          return _this4.parseIngredient(e.target.value);
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Directions"), /*#__PURE__*/React.createElement("textarea", {
        className: "form-control",
        value: this.state.dirTextVal,
        placeholder: "Separate each direction with a comma",
        onChange: function onChange(e) {
          var result = e.target.value.split(',').map(function (s) {
            return s.trim();
          });

          _this4.setState({
            directions: result,
            dirTextVal: e.target.value
          });
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/React.createElement("label", null, "Notes"), /*#__PURE__*/React.createElement("textarea", {
        className: "form-control",
        rows: 1,
        value: this.state.notes,
        onChange: function onChange(e) {
          return _this4.setState({
            notes: e.target.value
          });
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "toolbar-actions pull-right",
        style: {
          alignSelf: 'flex-end'
        }
      }, /*#__PURE__*/React.createElement("x-button", {
        className: "",
        onClick: this.submit
      }, "Save"))));
    }
  }]);
  return ModalForm;
}(React.Component);

exports["default"] = ModalForm;