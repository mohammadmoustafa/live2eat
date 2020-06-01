'use strict';

var path = require('path');

var _require = require('electron'),
    app = _require.app,
    Menu = _require.Menu,
    shell = _require.shell;

var _require2 = require('electron-util'),
    is = _require2.is,
    appMenu = _require2.appMenu,
    aboutMenuItem = _require2.aboutMenuItem,
    openUrlMenuItem = _require2.openUrlMenuItem,
    openNewGitHubIssue = _require2.openNewGitHubIssue,
    debugInfo = _require2.debugInfo;

var showPreferences = function showPreferences() {// Show the app's preferences here
};

var helpSubmenu = [openUrlMenuItem({
  label: 'Website',
  url: 'https://github.com/sindresorhus/electron-boilerplate'
}), openUrlMenuItem({
  label: 'Source Code',
  url: 'https://github.com/sindresorhus/electron-boilerplate'
}), {
  label: 'Report an Issue…',
  click: function click() {
    var body = "\n<!-- Please succinctly describe your issue and steps to reproduce it. -->\n\n\n---\n\n".concat(debugInfo());
    openNewGitHubIssue({
      user: 'sindresorhus',
      repo: 'electron-boilerplate',
      body: body
    });
  }
}];

if (!is.macos) {
  helpSubmenu.push({
    type: 'separator'
  }, aboutMenuItem({
    icon: path.join(__dirname, 'static', 'icon.png'),
    text: 'Created by Your Name'
  }));
}

var debugSubmenu = [{
  label: 'Show Settings',
  click: function click() {
    config.openInEditor();
  }
}, {
  label: 'Show App Data',
  click: function click() {
    shell.openItem(app.getPath('userData'));
  }
}, {
  type: 'separator'
}, {
  label: 'Delete Settings',
  click: function click() {
    config.clear();
    app.relaunch();
    app.quit();
  }
}, {
  label: 'Delete App Data',
  click: function click() {
    shell.moveItemToTrash(app.getPath('userData'));
    app.relaunch();
    app.quit();
  }
}];
var macosTemplate = [appMenu([{
  label: 'Preferences…',
  accelerator: 'Command+,',
  click: function click() {
    showPreferences();
  }
}]), {
  role: 'fileMenu',
  submenu: [{
    label: 'Custom'
  }, {
    type: 'separator'
  }, {
    role: 'close'
  }]
}, {
  role: 'editMenu'
}, {
  role: 'viewMenu'
}, {
  role: 'windowMenu'
}, {
  role: 'help',
  submenu: helpSubmenu
}]; // Linux and Windows

var otherTemplate = [{
  role: 'fileMenu',
  submenu: [{
    label: 'Custom'
  }, {
    type: 'separator'
  }, {
    label: 'Settings',
    accelerator: 'Control+,',
    click: function click() {
      showPreferences();
    }
  }, {
    type: 'separator'
  }, {
    role: 'quit'
  }]
}, {
  role: 'editMenu'
}, {
  role: 'viewMenu'
}, {
  role: 'help',
  submenu: helpSubmenu
}];
var template = process.platform === 'darwin' ? macosTemplate : otherTemplate;

if (is.development) {
  template.push({
    label: 'Debug',
    submenu: debugSubmenu
  });
}

module.exports = Menu.buildFromTemplate(template);