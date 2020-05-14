'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var path = require('path');
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, Menu = _a.Menu;
/// const {autoUpdater} = require('electron-updater');
var is = require('electron-util').is;
var unhandled = require('electron-unhandled');
var debug = require('electron-debug');
var contextMenu = require('electron-context-menu');
var menu = require('./src/js/menu.js');
var isDev = require('electron-is-dev');
var logger = require('electron-timber');
var url = require('url');
unhandled();
debug({
    isEnabled: true,
    showDevTools: true,
});
contextMenu();
// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.mohammadmoustafa.live2eat');
// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
// if (!is.development) {
// 	const FOUR_HOURS = 1000 * 60 * 60 * 4;
// 	setInterval(() => {
// 		autoUpdater.checkForUpdates();
// 	}, FOUR_HOURS);
//
// 	autoUpdater.checkForUpdates();
// }
// Prevent window from being garbage collected
var mainWindow;
var createMainWindow = function () { return __awaiter(void 0, void 0, void 0, function () {
    var win;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                win = new BrowserWindow({
                    title: app.name,
                    show: false,
                    width: 800,
                    height: 600,
                    titleBarStyle: 'hiddenInset',
                    frame: false,
                    webPreferences: {
                        nodeIntegration: true
                    }
                });
                win.on('ready-to-show', function () {
                    win.show();
                });
                win.on('closed', function () {
                    // Dereference the window
                    // For multiple windows store them in an array
                    mainWindow = undefined;
                });
                return [4 /*yield*/, win.loadURL(url.format({
                        pathname: path.join(__dirname, "src/html/index.html"),
                        protocol: 'file:',
                        slashes: true
                    }))];
            case 1:
                _a.sent();
                return [2 /*return*/, win];
        }
    });
}); };
// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
    app.quit();
}
app.on('second-instance', function () {
    if (mainWindow) {
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.show();
    }
});
app.on('window-all-closed', function () {
    if (!is.macos) {
        app.quit();
    }
});
app.on('activate', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!mainWindow) return [3 /*break*/, 2];
                return [4 /*yield*/, createMainWindow()];
            case 1:
                mainWindow = _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.whenReady()];
            case 1:
                _a.sent();
                Menu.setApplicationMenu(menu);
                return [4 /*yield*/, createMainWindow()];
            case 2:
                mainWindow = _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
