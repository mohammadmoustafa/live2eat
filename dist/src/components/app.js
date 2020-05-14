"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Sidebar_1 = __importDefault(require("./Sidebar"));
var remote = require('electron').remote;
var isDark = remote.nativeTheme.shouldUseDarkColors;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("div", { className: "pane-sm sidebar" },
                react_1.default.createElement(Sidebar_1.default, null)),
            react_1.default.createElement("div", { className: "pane" },
                react_1.default.createElement(react_router_dom_1.Switch, null,
                    react_1.default.createElement(react_router_dom_1.Route, { path: "/recipes" },
                        react_1.default.createElement("header", { className: "body" },
                            react_1.default.createElement("h1", { className: "body" }, "Recipes"),
                            react_1.default.createElement("h2", { className: "body" }, "Hmm...doesn't look like there's anything here."))),
                    react_1.default.createElement(react_router_dom_1.Route, null,
                        react_1.default.createElement("header", { className: "body" },
                            react_1.default.createElement("h1", { className: "body" }, "Live To Eat"),
                            react_1.default.createElement("h2", { className: "body" },
                                "System is using ",
                                (isDark) ? 'dark' : 'light',
                                " mode")))))));
    };
    return App;
}(react_1.default.Component));
exports.default = App;
