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
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var ROUTES = ['/recipes'];
var Nav = /** @class */ (function (_super) {
    __extends(Nav, _super);
    function Nav() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nav.prototype.render = function () {
        return (react_1.default.createElement("nav", { className: "nav-group" },
            react_1.default.createElement("h5", { className: "nav-group-title" }, "Navigation"),
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/dashboard", className: "nav-group-item", isActive: function (match, location) {
                    if (ROUTES.includes(location))
                        return true;
                    if (match)
                        return true;
                    return false;
                } },
                react_1.default.createElement("span", { className: "icon icon-home" }),
                "Dashboard"),
            react_1.default.createElement(react_router_dom_1.NavLink, { to: "/recipes", className: "nav-group-item" },
                react_1.default.createElement("span", { className: "icon icon-book-open" }),
                "Recipes")));
    };
    return Nav;
}(react_1.default.Component));
exports.default = Nav;
