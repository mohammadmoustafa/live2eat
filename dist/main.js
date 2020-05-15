'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var path = require('path');

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    Menu = _require.Menu,
    ipcMain = _require.ipcMain; // const {autoUpdater} = require('electron-updater');


var _require2 = require('electron-util'),
    is = _require2.is;

var unhandled = require('electron-unhandled');

var debug = require('electron-debug');

var contextMenu = require('electron-context-menu');

var menu = require('./js/menu.js');

var isDev = require('electron-is-dev');

var logger = require('electron-timber');

var url = require('url');

var Mousetrap = require('mousetrap');

unhandled();
if (isDev) debug();
contextMenu(); // Note: Must match `build.appId` in package.json

app.setAppUserModelId('com.mohammadmoustafa.live2eat'); // Uncomment this before publishing your first version.
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

var createMainWindow = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var win;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
            _context.next = 5;
            return win.loadURL(url.format({
              protocol: 'file',
              slashes: true,
              pathname: path.join(__dirname, './html/index.html')
            }));

          case 5:
            return _context.abrupt("return", win);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createMainWindow() {
    return _ref.apply(this, arguments);
  };
}(); // Prevent multiple instances of the app


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
app.on('activate', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (mainWindow) {
            _context2.next = 4;
            break;
          }

          _context2.next = 3;
          return createMainWindow();

        case 3:
          mainWindow = _context2.sent;

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return app.whenReady();

        case 2:
          Menu.setApplicationMenu(menu);
          _context3.next = 5;
          return createMainWindow();

        case 5:
          mainWindow = _context3.sent;

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
}))();