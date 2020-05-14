'use strict';
var path = require('path');
var _a = require('electron'), app = _a.app, Menu = _a.Menu, shell = _a.shell;
var _b = require('electron-util'), is = _b.is, appMenu = _b.appMenu, aboutMenuItem = _b.aboutMenuItem, openUrlMenuItem = _b.openUrlMenuItem, openNewGitHubIssue = _b.openNewGitHubIssue, debugInfo = _b.debugInfo;
var showPreferences = function () {
    // Show the app's preferences here
};
var helpSubmenu = [
    openUrlMenuItem({
        label: 'Website',
        url: 'https://github.com/sindresorhus/electron-boilerplate'
    }),
    openUrlMenuItem({
        label: 'Source Code',
        url: 'https://github.com/sindresorhus/electron-boilerplate'
    }),
    {
        label: 'Report an Issue…',
        click: function () {
            var body = "\n<!-- Please succinctly describe your issue and steps to reproduce it. -->\n\n\n---\n\n" + debugInfo();
            openNewGitHubIssue({
                user: 'sindresorhus',
                repo: 'electron-boilerplate',
                body: body
            });
        }
    }
];
if (!is.macos) {
    helpSubmenu.push({
        type: 'separator'
    }, aboutMenuItem({
        icon: path.join(__dirname, 'static', 'icon.png'),
        text: 'Created by Your Name'
    }));
}
var debugSubmenu = [
    {
        label: 'Show Settings',
        click: function () {
            config.openInEditor();
        }
    },
    {
        label: 'Show App Data',
        click: function () {
            shell.openItem(app.getPath('userData'));
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'Delete Settings',
        click: function () {
            config.clear();
            app.relaunch();
            app.quit();
        }
    },
    {
        label: 'Delete App Data',
        click: function () {
            shell.moveItemToTrash(app.getPath('userData'));
            app.relaunch();
            app.quit();
        }
    }
];
var macosTemplate = [
    appMenu([
        {
            label: 'Preferences…',
            accelerator: 'Command+,',
            click: function () {
                showPreferences();
            }
        }
    ]),
    {
        role: 'fileMenu',
        submenu: [
            {
                label: 'Custom'
            },
            {
                type: 'separator'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'viewMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: helpSubmenu
    }
];
// Linux and Windows
var otherTemplate = [
    {
        role: 'fileMenu',
        submenu: [
            {
                label: 'Custom'
            },
            {
                type: 'separator'
            },
            {
                label: 'Settings',
                accelerator: 'Control+,',
                click: function () {
                    showPreferences();
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'viewMenu'
    },
    {
        role: 'help',
        submenu: helpSubmenu
    }
];
var template = process.platform === 'darwin' ? macosTemplate : otherTemplate;
if (is.development) {
    template.push({
        label: 'Debug',
        submenu: debugSubmenu
    });
}
module.exports = Menu.buildFromTemplate(template);
