const { app, BrowserWindow } = require('electron');
const { enableLiveReload } = require('electron-compile');

enableLiveReload({ strategy: 'react-hmr' });

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 300, height: 600, minWidth: 300, show: false });
  mainWindow.loadURL(`file://${__dirname}/index.jade`);
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
});
