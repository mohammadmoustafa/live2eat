'use strict';
import {
	app,
	BrowserWindow,
	Menu,
	ipcMain as ipc, 
	nativeTheme,
	ipcMain
} from 'electron';
import PouchDB from 'pouchdb';

const path = require('path');
const {is} = require('electron-util');
const unhandled = require('electron-unhandled');
const debug = require('electron-debug');
const contextMenu = require('electron-context-menu');
const menu = require('./js/menu.js');
const isDev = require('electron-is-dev');
const logger = require('electron-timber');
const url = require('url');
var Mousetrap = require('mousetrap');

const isDark = nativeTheme.shouldUseDarkColors;
const USER_DARK = false;
global.DARK_MODE = isDark && USER_DARK;



unhandled();
// if (isDev) debug();
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
let mainWindow: any;

const createMainWindow = async () => {
	const win = new BrowserWindow({
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

	win.on('ready-to-show', () => {
		win.show();
	});

	win.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});

	await win.loadURL(url.format({
		protocol: 'file',
		slashes: true,
		pathname: path.join(__dirname, './html/index.html')
	}));
	return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}
});

(async () => {
	await app.whenReady();
	Menu.setApplicationMenu(menu);
	mainWindow = await createMainWindow();
})();

ipcMain.on('db-refresh-request', (e: any, arg: any) => {
	mainWindow.webContents.send('db-refresh');
})