import { app, BrowserWindow } from 'electron';
var fileWatcher = require('filewatcher');

var watcher = fileWatcher();
watcher.add(__dirname);
watcher.on('change', (file: any, stat: any) => {
    console.log("reload detected");
    reloadWindow();
});

let win: BrowserWindow = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadURL(`file://${__dirname}/index.html`);

    win.on('closed', () => {
        win = null;
    });
}

function reloadWindow() {
    win.loadURL(`file://${__dirname}/index.html`);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});