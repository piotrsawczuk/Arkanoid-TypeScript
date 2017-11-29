const electron = require('electron');
const path = require('path');
const url = require('url');

const {app, BrowserWindow, Menu} = electron;
var mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width : 800,
        height : 600,
        resizable : false,
		title: "Arkanoid by Piotr Sawczuk",
        useContentSize : true
    });
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname, 'main.html'),
        protocol : 'file:',
        slashes : true
    }));
    mainWindow.on('closed', function() {
        app.quit();
    });
    mainWindow.setMenu(Menu.buildFromTemplate(menuTemplate));
});

const menuTemplate = [
    {
        label : 'Menu',
        submenu : [
            {
                role : 'reload',
                label : 'Reload',
                accelerator : 'F5',
            },
            {
                label : 'Quit',
                accelerator : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];